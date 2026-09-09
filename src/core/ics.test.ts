import { describe, it, expect } from 'vitest';
import { parseIcs, parseDate } from './ics';

/** Un calendrier minimal, avec l'en-tête que tout serveur envoie. */
const cal = (corps: string) =>
  ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//ADE//FR', corps, 'END:VCALENDAR'].join('\r\n');

const evt = (lignes: string[]) => cal(['BEGIN:VEVENT', ...lignes, 'END:VEVENT'].join('\r\n'));

describe('Lecture iCalendar', () => {
  it('lit un cours : heures, intitulé, salle', () => {
    const [e] = parseIcs(
      evt([
        'UID:ADE60-2026',
        'DTSTART;TZID=Europe/Paris:20260907T081500',
        'DTEND;TZID=Europe/Paris:20260907T101500',
        'SUMMARY:Optimisation - CM',
        'LOCATION:Amphi Guillaume',
        'DESCRIPTION:L3 Économie\\nMontaru',
      ]),
    );
    expect(e.summary).toBe('Optimisation - CM');
    expect(e.location).toBe('Amphi Guillaume');
    expect(e.description).toBe('L3 Économie\nMontaru');
    expect(e.start.getHours()).toBe(8);
    expect(e.start.getMinutes()).toBe(15);
    expect(e.end.getHours()).toBe(10);
    expect(e.allDay).toBe(false);
  });

  it('déplie les lignes coupées à 75 octets', () => {
    /* Sans dépliage, la salle s'arrêterait au milieu du mot : c'est la
       première chose que fait la norme, et la première qu'on oublie. */
    const [e] = parseIcs(
      evt([
        'UID:x',
        'DTSTART:20260907T081500Z',
        'DTEND:20260907T101500Z',
        'SUMMARY:Économétrie des séries temporelles appliquée aux marchés',
        'LOCATION:Bâtiment Anciennes Facultés - Salle ',
        ' AF 204 (deuxième étage)',
      ]),
    );
    expect(e.location).toBe('Bâtiment Anciennes Facultés - Salle AF 204 (deuxième étage)');
  });

  it('ramène une heure UTC à l’heure locale, et laisse une heure murale intacte', () => {
    const utc = parseDate('20260907T081500Z')!;
    expect(utc.date.getTime()).toBe(Date.UTC(2026, 8, 7, 8, 15, 0));
    const murale = parseDate('20260907T081500')!;
    expect(murale.date.getHours()).toBe(8);
    expect(murale.allDay).toBe(false);
    const jour = parseDate('20260907')!;
    expect(jour.allDay).toBe(true);
  });

  it('accepte un TZID entre guillemets, deux-points compris', () => {
    const [e] = parseIcs(
      evt(['UID:x', 'DTSTART;TZID="Europe/Paris":20260907T140000', 'DURATION:PT1H30M', 'SUMMARY:TD']),
    );
    expect(e.start.getHours()).toBe(14);
    expect(e.end.getHours()).toBe(15);
    expect(e.end.getMinutes()).toBe(30);
  });

  it('rend les caractères échappés au lieu de leurs antislashs', () => {
    const [e] = parseIcs(
      evt(['UID:x', 'DTSTART:20260907T080000', 'SUMMARY:Micro\\, macro\\; et le reste']),
    );
    expect(e.summary).toBe('Micro, macro; et le reste');
  });

  it('développe une récurrence hebdomadaire, bornée par UNTIL', () => {
    const evenements = parseIcs(
      evt([
        'UID:hebdo',
        'DTSTART:20260907T081500',
        'DTEND:20260907T101500',
        'RRULE:FREQ=WEEKLY;BYDAY=MO;UNTIL=20260928T235900',
        'SUMMARY:Optimisation',
      ]),
    );
    expect(evenements.map((e) => e.start.getDate())).toEqual([7, 14, 21, 28]);
    // La durée suit chaque occurrence.
    expect(evenements.every((e) => e.end.getTime() - e.start.getTime() === 2 * 3600 * 1000)).toBe(
      true,
    );
  });

  it('respecte COUNT, INTERVAL et les dates exclues', () => {
    /* Une semaine sur deux, trois fois : 7 et 21 septembre, 5 octobre. Le 21
       est annulé — COUNT compte les occurrences de la règle, pas celles qui
       restent, donc il n'y a pas de quatrième séance pour compenser. */
    const evenements = parseIcs(
      evt([
        'UID:quinzaine',
        'DTSTART:20260907T081500',
        'DTEND:20260907T101500',
        'RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=MO;COUNT=3',
        'EXDATE:20260921T081500',
        'SUMMARY:TD une semaine sur deux',
      ]),
    );
    expect(evenements.map((e) => `${e.start.getMonth() + 1}/${e.start.getDate()}`)).toEqual([
      '9/7',
      '10/5',
    ]);
  });

  it('développe une récurrence quotidienne — une semaine d’examens', () => {
    const evenements = parseIcs(
      evt([
        'UID:exams',
        'DTSTART:20261207T090000',
        'DTEND:20261207T120000',
        'RRULE:FREQ=DAILY;COUNT=5',
        'SUMMARY:Épreuve',
      ]),
    );
    expect(evenements.map((e) => e.start.getDate())).toEqual([7, 8, 9, 10, 11]);
  });

  it('ignore un VEVENT sans date plutôt que d’abandonner le calendrier', () => {
    const evenements = parseIcs(
      cal(
        [
          'BEGIN:VEVENT',
          'UID:cassé',
          'SUMMARY:Sans heure',
          'END:VEVENT',
          'BEGIN:VEVENT',
          'UID:bon',
          'DTSTART:20260907T081500',
          'DTEND:20260907T101500',
          'SUMMARY:Cours',
          'END:VEVENT',
        ].join('\r\n'),
      ),
    );
    expect(evenements).toHaveLength(1);
    expect(evenements[0].summary).toBe('Cours');
  });

  it('ne rend rien pour un fichier vide ou étranger', () => {
    expect(parseIcs('')).toEqual([]);
    expect(parseIcs('<!doctype html><title>Erreur 403</title>')).toEqual([]);
  });
});
