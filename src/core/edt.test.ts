import { describe, it, expect } from 'vitest';
import { ageSynchro, coursDepuisTexte, ressembleAUnCalendrier } from './edt';
import { isStudy, dayGoals } from './planning';

const cal = (corps: string[]) =>
  [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ADE/version 6.0//FR',
    ...corps,
    'END:VCALENDAR',
  ].join('\r\n');

const cours = (lignes: string[]) => cal(['BEGIN:VEVENT', ...lignes, 'END:VEVENT']);

const SEMAINE = cal([
  'BEGIN:VEVENT',
  'UID:ADE-1',
  'DTSTART;TZID=Europe/Paris:20260907T081500',
  'DTEND;TZID=Europe/Paris:20260907T101500',
  'SUMMARY:Optimisation - CM',
  'LOCATION:Amphi Guillaume',
  'DESCRIPTION:L3 Économie\\nMontaru\\n\\n(Exporté le:07/09/2026 06:12)',
  'END:VEVENT',
  'BEGIN:VEVENT',
  'UID:ADE-2',
  'DTSTART;TZID=Europe/Paris:20260908T140000',
  'DTEND;TZID=Europe/Paris:20260908T160000',
  'SUMMARY:Économétrie - TD',
  'LOCATION:AF 204',
  'END:VEVENT',
]);

describe("L'emploi du temps devient des séances de planning", () => {
  it('donne une séance par cours, à sa date, à son heure, avec sa durée', () => {
    const seances = coursDepuisTexte(SEMAINE);
    expect(seances).toHaveLength(2);
    expect(seances[0]).toMatchObject({
      date: '2026-09-07',
      start: '08:15',
      minutes: 120,
      title: 'Optimisation - CM',
      subject: 'cours',
      source: 'edt',
    });
    expect(seances[1]).toMatchObject({ date: '2026-09-08', start: '14:00', minutes: 120 });
  });

  it('met la salle en tête de la note, et jette le pied de page d’export', () => {
    /* La date d'export change à chaque lecture : la garder ferait croire à une
       modification du cours à chaque synchronisation. */
    const [seance] = coursDepuisTexte(SEMAINE);
    expect(seance.note).toBe('Amphi Guillaume · L3 Économie · Montaru');
    expect(seance.note).not.toMatch(/Export/i);
  });

  it('ne répète pas dans la note ce que le titre dit déjà', () => {
    const [seance] = coursDepuisTexte(
      cours([
        'UID:x',
        'DTSTART:20260907T081500',
        'DTEND:20260907T101500',
        'SUMMARY:Optimisation',
        'LOCATION:AF 204',
        'DESCRIPTION:Optimisation\\nAF 204\\nMontaru',
      ]),
    );
    expect(seance.note).toBe('AF 204 · Montaru');
  });

  it('donne un identifiant distinct à chaque occurrence d’une récurrence', () => {
    /* Un seul UID pour douze séances : sans la date dans la clé, elles se
       chasseraient l'une l'autre en base et il n'en resterait qu'une. */
    const seances = coursDepuisTexte(
      cours([
        'UID:hebdo',
        'DTSTART:20260907T081500',
        'DTEND:20260907T101500',
        'RRULE:FREQ=WEEKLY;BYDAY=MO;COUNT=12',
        'SUMMARY:Optimisation',
      ]),
    );
    expect(seances).toHaveLength(12);
    expect(new Set(seances.map((s) => s.id)).size).toBe(12);
  });

  it('étale une journée entière sur tous ses jours', () => {
    const seances = coursDepuisTexte(
      cours([
        'UID:vac',
        'DTSTART;VALUE=DATE:20261026',
        'DTEND;VALUE=DATE:20261031',
        'SUMMARY:Vacances de la Toussaint',
      ]),
    );
    expect(seances.map((s) => s.date)).toEqual([
      '2026-10-26',
      '2026-10-27',
      '2026-10-28',
      '2026-10-29',
      '2026-10-30',
    ]);
    expect(seances.every((s) => s.allDay)).toBe(true);
  });

  it('arrête à minuit une séance qui déborde sur le lendemain', () => {
    const [seance] = coursDepuisTexte(
      cours(['UID:x', 'DTSTART:20260907T230000', 'DTEND:20260908T010000', 'SUMMARY:Nuit']),
    );
    expect(seance.date).toBe('2026-09-07');
    expect(seance.minutes).toBe(60);
  });

  it('ne compte pas les cours dans le temps d’étude', () => {
    /* La règle de fond : un amphi occupe la journée, il ne remplit pas les
       objectifs. Les gonfler avec des heures subies les rendrait inutiles. */
    const seances = coursDepuisTexte(SEMAINE);
    expect(seances.every((s) => !isStudy(s.subject))).toBe(true);
    const objectifs = dayGoals(seances, [], []);
    expect(objectifs.sessions).toEqual({ done: 0, total: 0 });
    expect(objectifs.minutes.planned).toBe(0);
  });

  it('ne dédouble pas un créneau exporté deux fois', () => {
    const seances = coursDepuisTexte(
      cal([
        'BEGIN:VEVENT',
        'UID:double',
        'DTSTART:20260907T081500',
        'DTEND:20260907T101500',
        'SUMMARY:Optimisation',
        'END:VEVENT',
        'BEGIN:VEVENT',
        'UID:double',
        'DTSTART:20260907T081500',
        'DTEND:20260907T101500',
        'SUMMARY:Optimisation',
        'END:VEVENT',
      ]),
    );
    expect(seances).toHaveLength(1);
  });

  it('reconnaît un calendrier d’une page d’erreur', () => {
    expect(ressembleAUnCalendrier(SEMAINE)).toBe(true);
    expect(ressembleAUnCalendrier('<!doctype html><title>Connexion</title>')).toBe(false);
    expect(ressembleAUnCalendrier('')).toBe(false);
  });

  it('dit l’âge de la dernière lecture en français', () => {
    const t = Date.parse('2026-09-07T12:00:00Z');
    expect(ageSynchro(undefined, t)).toBeNull();
    expect(ageSynchro('pas une date', t)).toBeNull();
    expect(ageSynchro('2026-09-07T11:59:40Z', t)).toBe("à l'instant");
    expect(ageSynchro('2026-09-07T11:30:00Z', t)).toBe('il y a 30 min');
    expect(ageSynchro('2026-09-07T09:00:00Z', t)).toBe('il y a 3 h');
    expect(ageSynchro('2026-09-06T12:00:00Z', t)).toBe('hier');
    expect(ageSynchro('2026-09-03T12:00:00Z', t)).toBe('il y a 4 jours');
  });
});
