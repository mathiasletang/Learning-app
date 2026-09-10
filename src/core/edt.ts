/* =========================================================================
   L'emploi du temps — les cours tels que l'université les impose.

   Ce module traduit un calendrier iCalendar en séances de planning. Il ne
   décide de rien d'autre : ces séances portent `source: 'edt'`, ce qui les
   rend intouchables dans l'interface et les tient hors des objectifs
   d'étude (matière « Cours et TD », `study: false`).

   Module PUR, couvert par des tests. Le téléchargement vit dans
   `src/app/actions.ts`.
   ========================================================================= */

import { toDayStr } from './date';
import { parseIcs, type IcsEvent } from './ics';
import { toClock } from './planning';
import type { PlanEvent } from './types';

/**
 * Le flux d'ADE n'autorise pas les requêtes d'une autre origine : le
 * navigateur refuserait de le lire. Le fichier est donc servi par
 * l'application elle-même (`netlify/functions/edt.mjs` en production,
 * `vite.config.ts` en développement). Effet de bord heureux : l'adresse
 * personnelle du flux, avec son jeton, ne part jamais dans le paquet
 * JavaScript.
 *
 * Ce chemin dépend d'un serveur, donc il peut tomber — c'est arrivé. L'import
 * d'un fichier `.ics`, lui, ne dépend de rien : c'est la voie principale, et
 * la lecture réseau n'est qu'une commodité par-dessus.
 */
export const EDT_URL = `${import.meta.env.BASE_URL}edt.ics`;

/** D'où viennent les cours en base : lus sur le réseau, ou importés à la main. */
export type OrigineEdt = 'reseau' | 'fichier';

/** L'établissement, tel qu'il s'affiche dans le bandeau de synchronisation. */
export const EDT_SOURCE = 'UT Capitole';

/** Au-delà, on redemande le flux : un changement de salle doit finir par arriver. */
export const EDT_FRAICHEUR_MS = 6 * 3600 * 1000;

/** Une journée entière ne s'étale pas indéfiniment — un export fautif est borné. */
const MAX_JOURS = 31;

/* ------------------------------- Nettoyage ------------------------------- */

/**
 * ADE remplit la description de mentions utiles (groupe, enseignant) et de
 * bruit : l'intitulé déjà lu dans le titre, la salle déjà lue à côté, et le
 * pied de page d'export daté qui changerait à chaque synchronisation.
 */
function notes(ics: IcsEvent): string | undefined {
  const dejaVu = [ics.summary, ics.location].map((s) => s.toLowerCase().trim());
  const lignes = ics.description
    .split('\n')
    /* « (Exporté le:07/09/2026 06:12) » — daté, donc différent à chaque
       lecture. Le garder ferait passer chaque synchronisation pour une
       modification du cours. Il vient sur sa ligne, parfois en fin de ligne. */
    .map((l) => l.replace(/\(export[^)]*\)/gi, '').replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .filter((l) => !dejaVu.includes(l.toLowerCase()));

  const parts = [ics.location.replace(/\s+/g, ' ').trim(), ...lignes].filter(Boolean);
  return parts.length ? parts.join(' · ') : undefined;
}

/** Un intitulé vide vaut mieux nommé que blanc dans la grille. */
function titre(ics: IcsEvent): string {
  return ics.summary.replace(/\s+/g, ' ').trim() || 'Cours';
}

/* -------------------------------- Séances -------------------------------- */

/**
 * Une séance de planning par occurrence. L'identifiant porte la date :
 * une récurrence partage un seul UID entre toutes ses occurrences, qui se
 * chasseraient l'une l'autre dans la base.
 */
function seance(ics: IcsEvent, date: string, start: string, minutes: number): PlanEvent {
  return {
    id: `edt:${ics.uid || titre(ics)}:${date}:${start}`,
    date,
    start,
    minutes,
    title: titre(ics),
    subject: 'cours',
    note: notes(ics),
    allDay: ics.allDay || undefined,
    source: 'edt',
    /* Les séances d'une même heure se départagent par leur date de création :
       ici, l'heure de début — stable d'une synchronisation à l'autre. */
    createdAt: ics.start.toISOString(),
  };
}

/**
 * Les séances d'un calendrier, prêtes pour le planning.
 *
 * Deux cas particuliers, tous deux visibles à l'écran s'ils sont ratés :
 * une journée entière qui couvre plusieurs jours se pose sur chacun d'eux
 * (sinon une semaine de vacances n'apparaîtrait que le lundi), et une séance
 * qui franchit minuit s'arrête à la fin de sa journée (le planning range les
 * séances par date, une séance ne peut pas en occuper deux).
 */
export function coursDepuisIcs(evenements: IcsEvent[]): PlanEvent[] {
  const seances: PlanEvent[] = [];

  for (const ics of evenements) {
    if (Number.isNaN(ics.start.getTime())) continue;

    if (ics.allDay) {
      const jours = Math.min(
        MAX_JOURS,
        Math.max(1, Math.round((ics.end.getTime() - ics.start.getTime()) / 86_400_000)),
      );
      for (let i = 0; i < jours; i++) {
        const jour = new Date(ics.start);
        jour.setDate(jour.getDate() + i);
        seances.push(seance(ics, toDayStr(jour), '00:00', 0));
      }
      continue;
    }

    const date = toDayStr(ics.start);
    const debut = ics.start.getHours() * 60 + ics.start.getMinutes();
    const brute = Math.round((ics.end.getTime() - ics.start.getTime()) / 60_000);
    const minutes = Math.max(0, Math.min(brute, 24 * 60 - debut));
    seances.push(seance(ics, date, toClock(debut), minutes));
  }

  /* Un même créneau exporté deux fois (ADE le fait quand un cours change de
     groupe) ne doit pas se dédoubler dans la grille. */
  const vues = new Map<string, PlanEvent>();
  for (const s of seances) vues.set(s.id, s);
  return [...vues.values()];
}

/** Le chemin complet : texte iCalendar → séances de planning. */
export function coursDepuisTexte(source: string): PlanEvent[] {
  return coursDepuisIcs(parseIcs(source));
}

/** Un flux vide ou une page d'erreur renvoyée à la place du calendrier. */
export function ressembleAUnCalendrier(source: string): boolean {
  return /BEGIN:VCALENDAR/i.test(source);
}

/**
 * Pourquoi ce texte ne peut pas devenir un emploi du temps — ou `null` s'il
 * le peut.
 *
 * Ce contrôle passe **avant** l'écriture, et c'est tout son intérêt : un lien
 * périmé renvoie une page de connexion avec un code 200, un mauvais fichier
 * s'importe sans broncher. Écrire d'abord et constater ensuite remplacerait
 * un emploi du temps correct par zéro cours.
 */
export function refusDeCalendrier(source: string, cours: PlanEvent[]): string | null {
  if (!source.trim()) return 'fichier vide';
  if (!ressembleAUnCalendrier(source)) return "ce n'est pas un calendrier (BEGIN:VCALENDAR attendu)";
  if (cours.length === 0) return 'calendrier sans aucun cours';
  return null;
}

/** « il y a 3 min », « il y a 2 h » — l'âge de la dernière synchronisation. */
export function ageSynchro(iso: string | undefined, maintenant = Date.now()): string | null {
  if (!iso) return null;
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return null;
  const minutes = Math.max(0, Math.round((maintenant - t) / 60_000));
  if (minutes < 1) return "à l'instant";
  if (minutes < 60) return `il y a ${minutes} min`;
  const heures = Math.round(minutes / 60);
  if (heures < 24) return `il y a ${heures} h`;
  const jours = Math.round(heures / 24);
  return jours === 1 ? 'hier' : `il y a ${jours} jours`;
}
