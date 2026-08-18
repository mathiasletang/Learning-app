/* =========================================================================
   Les activités auxquelles une séance peut être rattachée.

   Poser « Maths, 9 h » ne dit pas quoi ouvrir à 9 h. Une séance peut donc
   viser une activité précise — une fiche, une banque de questions, la séance
   de révision du jour — et « Commencer » y mène d'un clic. Ces cibles sont
   les routes réelles de l'application : rien de nouveau à maintenir.
   ========================================================================= */

import { FICHES } from '@/core/fiches';
import { BANKS, BANK_ORDER } from '@/core/meta';
import { SUBJECT_DEFS, SUBJECT_ORDER } from '@/core/subjects';
import type { PlanSubject } from '@/core/types';

export interface ActivityOption {
  route: string;
  label: string;
  group: string;
  /** Matière proposée d'office quand on choisit cette activité. */
  subject: PlanSubject;
}

const SUBJECT_OF: Record<string, PlanSubject> = {
  maths: 'maths',
  cfa: 'cfa',
  code: 'code',
};

export function activityOptions(): ActivityOption[] {
  const out: ActivityOption[] = [
    { route: '/reviser', label: 'Réviser — la séance du jour', group: 'Séances', subject: 'autre' },
    { route: '/anglais', label: 'Anglais — étudier', group: 'Séances', subject: 'anglais' },
  ];

  for (const id of SUBJECT_ORDER) {
    const def = SUBJECT_DEFS[id];
    out.push({
      route: def.path,
      label: `${def.label} — le parcours`,
      group: 'Matières',
      subject: SUBJECT_OF[id] ?? 'autre',
    });
    out.push({
      route: `/cartes/${id}`,
      label: `${def.label} — parcourir les cartes`,
      group: 'Cartes',
      subject: SUBJECT_OF[id] ?? 'autre',
    });
  }

  for (const f of FICHES) {
    out.push({
      route: `/fiche/${f.id}`,
      label: `${f.chapter} — ${f.title}`,
      group: `Fiches · ${SUBJECT_DEFS[f.subject].label}`,
      subject: SUBJECT_OF[f.subject] ?? 'autre',
    });
  }

  for (const b of BANK_ORDER) {
    out.push({
      route: `/qcm/${b}`,
      label: `QCM — ${BANKS[b].title}`,
      group: 'Questions',
      subject: b === 'cfa' || b === 'fin' ? 'cfa' : 'maths',
    });
  }

  return out;
}

export function activityByRoute(route?: string): ActivityOption | undefined {
  if (!route) return undefined;
  return activityOptions().find((o) => o.route === route);
}

/** Les activités rangées par groupe, dans l'ordre de première apparition. */
export function activityGroups(): { group: string; options: ActivityOption[] }[] {
  const map = new Map<string, ActivityOption[]>();
  for (const o of activityOptions()) {
    const list = map.get(o.group) ?? [];
    list.push(o);
    map.set(o.group, list);
  }
  return [...map.entries()].map(([group, options]) => ({ group, options }));
}
