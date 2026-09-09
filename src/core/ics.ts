/* =========================================================================
   Lecture d'un calendrier iCalendar (RFC 5545).

   Assez de la norme pour un emploi du temps universitaire, pas une ligne de
   plus : les VEVENT, leurs heures, leur intitulé, leur salle — et la
   récurrence, au cas où le serveur la factorise au lieu d'énumérer les
   séances.

   Module PUR, couvert par des tests.
   ========================================================================= */

export interface IcsEvent {
  /** Identifiant du serveur. Une récurrence le partage entre ses occurrences. */
  uid: string;
  start: Date;
  end: Date;
  /** Sans horaire : `DTSTART;VALUE=DATE`. */
  allDay: boolean;
  summary: string;
  location: string;
  description: string;
}

interface Propriete {
  nom: string;
  params: Record<string, string>;
  valeur: string;
}

/** Garde-fou : une récurrence mal bornée ne doit pas remplir la mémoire. */
const MAX_OCCURRENCES = 400;

/* ------------------------------ Découpage -------------------------------- */

/**
 * Le dépliage des lignes, première étape obligatoire : la norme coupe toute
 * ligne à 75 octets et poursuit la suivante par une espace. Analyser sans
 * déplier tronque une salle sur deux.
 */
function deplie(texte: string): string[] {
  const lignes: string[] = [];
  for (const brute of texte.replace(/\r\n?/g, '\n').split('\n')) {
    if ((brute.startsWith(' ') || brute.startsWith('\t')) && lignes.length) {
      lignes[lignes.length - 1] += brute.slice(1);
    } else {
      lignes.push(brute);
    }
  }
  return lignes;
}

/**
 * `DTSTART;TZID="Europe/Paris":20260907T081500` → nom, paramètres, valeur.
 * Le deux-points qui sépare la valeur est le premier hors guillemets — un
 * TZID entre guillemets peut en contenir un.
 */
function propriete(ligne: string): Propriete | null {
  let coupe = -1;
  let dansGuillemets = false;
  for (let i = 0; i < ligne.length; i++) {
    const c = ligne[i];
    if (c === '"') dansGuillemets = !dansGuillemets;
    else if (c === ':' && !dansGuillemets) {
      coupe = i;
      break;
    }
  }
  if (coupe < 0) return null;

  const entete = ligne.slice(0, coupe).split(';');
  const params: Record<string, string> = {};
  for (const p of entete.slice(1)) {
    const eq = p.indexOf('=');
    if (eq > 0) params[p.slice(0, eq).toUpperCase()] = p.slice(eq + 1).replace(/^"|"$/g, '');
  }
  return { nom: entete[0].toUpperCase(), params, valeur: ligne.slice(coupe + 1) };
}

/** Le texte d'une propriété : la norme échappe virgules, points-virgules et sauts de ligne. */
function texte(valeur: string): string {
  return valeur
    .replace(/\\n/gi, '\n')
    .replace(/\\([,;\\])/g, '$1')
    .trim();
}

/* -------------------------------- Dates ---------------------------------- */

/**
 * Une date iCalendar en date locale.
 *
 * Trois formes : suffixée `Z` (UTC, convertie), nue (heure murale, prise
 * telle quelle), ou sans heure (journée entière). Une heure portant un
 * `TZID` est lue comme une heure murale : l'emploi du temps est à Toulouse
 * et se lit à Toulouse — traduire vers un autre fuseau serait faux dans le
 * seul cas où l'utilisateur voyage, juste dans tous les autres.
 */
export function parseDate(valeur: string): { date: Date; allDay: boolean } | null {
  const m = /^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})?(Z)?)?$/.exec(valeur.trim());
  if (!m) return null;
  const [, y, mo, d, h, mi, s, z] = m;
  const n = (v?: string) => (v ? Number(v) : 0);
  if (!h) return { date: new Date(n(y), n(mo) - 1, n(d)), allDay: true };
  const date = z
    ? new Date(Date.UTC(n(y), n(mo) - 1, n(d), n(h), n(mi), n(s)))
    : new Date(n(y), n(mo) - 1, n(d), n(h), n(mi), n(s));
  return { date, allDay: false };
}

/** `PT1H30M`, `P1D` → millisecondes. Le champ DURATION, quand DTEND manque. */
function parseDuree(valeur: string): number | null {
  const m = /^-?P(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/.exec(valeur.trim());
  if (!m) return null;
  const n = (v?: string) => (v ? Number(v) : 0);
  const ms =
    ((n(m[1]) * 7 + n(m[2])) * 24 * 3600 + n(m[3]) * 3600 + n(m[4]) * 60 + n(m[5])) * 1000;
  return ms || null;
}

/* ------------------------------ Récurrence ------------------------------- */

const JOURS_RRULE = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

/**
 * Les occurrences d'une règle de récurrence, hebdomadaire ou quotidienne.
 *
 * Un serveur ADE énumère normalement chaque séance ; certains exports
 * factorisent. Sans cette expansion, un emploi du temps entier tiendrait
 * dans sa première semaine — la panne serait discrète et coûteuse. Les
 * fréquences mensuelles et annuelles n'existent pas dans un emploi du temps :
 * elles sont ignorées, et l'occurrence de départ reste affichée.
 */
function occurrences(debut: Date, rrule: string, exclues: Set<number>): Date[] {
  const regles: Record<string, string> = {};
  for (const part of rrule.split(';')) {
    const eq = part.indexOf('=');
    if (eq > 0) regles[part.slice(0, eq).toUpperCase()] = part.slice(eq + 1);
  }
  const freq = (regles.FREQ ?? '').toUpperCase();
  if (freq !== 'WEEKLY' && freq !== 'DAILY') return [debut];

  const interval = Math.max(1, Number(regles.INTERVAL ?? 1) || 1);
  const count = regles.COUNT ? Number(regles.COUNT) : undefined;
  const until = regles.UNTIL ? parseDate(regles.UNTIL)?.date : undefined;
  const jours = (regles.BYDAY ?? '')
    .split(',')
    .map((j) => JOURS_RRULE.indexOf(j.trim().slice(-2).toUpperCase()))
    .filter((i) => i >= 0);

  const dates: Date[] = [];
  /* COUNT compte les occurrences produites par la règle, avant retrait des
     dates exclues (RFC 5545 §3.8.5.3) : deux compteurs, pas un. */
  let produites = 0;

  /** Ajoute une occurrence. Renvoie faux quand la règle est épuisée. */
  const pousse = (d: Date): boolean => {
    if (until && d.getTime() > until.getTime()) return false;
    produites++;
    if (!exclues.has(d.getTime())) dates.push(d);
    return !(count && produites >= count) && produites < MAX_OCCURRENCES;
  };

  /** Le jour donné, à l'heure de la première occurrence. */
  const aLHeureDe = (jour: Date) =>
    new Date(
      jour.getFullYear(),
      jour.getMonth(),
      jour.getDate(),
      debut.getHours(),
      debut.getMinutes(),
      debut.getSeconds(),
    );

  if (freq === 'DAILY' || jours.length === 0) {
    const pas = freq === 'DAILY' ? interval : interval * 7;
    const curseur = new Date(debut);
    for (let i = 0; i < MAX_OCCURRENCES; i++) {
      if (!pousse(aLHeureDe(curseur))) break;
      curseur.setDate(curseur.getDate() + pas);
    }
    return dates;
  }

  /* Hebdomadaire avec BYDAY : on parcourt les semaines, et dans chacune les
     jours listés — jamais avant la date de départ. */
  const lundi = new Date(debut);
  lundi.setDate(lundi.getDate() - ((lundi.getDay() + 6) % 7));
  const ordonnes = [...jours].sort((a, b) => ((a + 6) % 7) - ((b + 6) % 7));
  for (let semaine = 0; semaine < MAX_OCCURRENCES; semaine += 1) {
    let epuisee = false;
    for (const jour of ordonnes) {
      const d = new Date(lundi);
      d.setDate(lundi.getDate() + semaine * interval * 7 + ((jour + 6) % 7));
      const occurrence = aLHeureDe(d);
      if (occurrence.getTime() < debut.getTime()) continue;
      if (!pousse(occurrence)) {
        epuisee = true;
        break;
      }
    }
    if (epuisee) break;
  }
  return dates;
}

/* -------------------------------- Lecture -------------------------------- */

/**
 * Les événements d'un calendrier. Un VEVENT sans date de début est ignoré
 * plutôt que rejeté : une ligne fautive ne doit pas emporter l'emploi du
 * temps entier.
 */
export function parseIcs(source: string): IcsEvent[] {
  const evenements: IcsEvent[] = [];
  let courant: Propriete[] | null = null;

  for (const ligne of deplie(source)) {
    const nette = ligne.trim();
    if (nette === 'BEGIN:VEVENT') {
      courant = [];
      continue;
    }
    if (nette === 'END:VEVENT') {
      if (courant) evenements.push(...construit(courant));
      courant = null;
      continue;
    }
    if (!courant) continue;
    const p = propriete(nette);
    if (p) courant.push(p);
  }
  return evenements;
}

function construit(props: Propriete[]): IcsEvent[] {
  const get = (nom: string) => props.find((p) => p.nom === nom);
  const dtstart = get('DTSTART');
  if (!dtstart) return [];
  const debut = parseDate(dtstart.valeur);
  if (!debut) return [];

  const allDay = debut.allDay || dtstart.params.VALUE === 'DATE';
  const dtend = get('DTEND');
  const fin = dtend ? parseDate(dtend.valeur)?.date : undefined;
  const duree = fin
    ? fin.getTime() - debut.date.getTime()
    : (get('DURATION') && parseDuree(get('DURATION')!.valeur)) ||
      (allDay ? 24 * 3600 * 1000 : 3600 * 1000);

  const base = {
    uid: get('UID')?.valeur.trim() || '',
    allDay,
    summary: texte(get('SUMMARY')?.valeur ?? ''),
    location: texte(get('LOCATION')?.valeur ?? ''),
    description: texte(get('DESCRIPTION')?.valeur ?? ''),
  };

  const exclues = new Set(
    props
      .filter((p) => p.nom === 'EXDATE')
      .flatMap((p) => p.valeur.split(','))
      .map((v) => parseDate(v)?.date.getTime())
      .filter((t): t is number => t !== undefined),
  );

  const rrule = get('RRULE');
  const departs = rrule ? occurrences(debut.date, rrule.valeur, exclues) : [debut.date];

  return departs.map((start) => ({
    ...base,
    start,
    end: new Date(start.getTime() + Math.max(0, duree)),
  }));
}
