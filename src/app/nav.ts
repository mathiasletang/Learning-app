import type { IconName } from '@/ui/Icon';

export interface NavItem {
  to: string;
  label: string;
  icon: IconName;
  end?: boolean;
}

/**
 * Cinq destinations, une par unité de travail réelle : l'accueil répond à
 * « que faire maintenant », chaque matière contient tout ce qui la concerne,
 * le suivi regroupe mesures et réglages. Pas de groupes : la liste est courte.
 */
export const NAV: NavItem[] = [
  { to: '/', label: 'Accueil', icon: 'home', end: true },
  { to: '/anglais', label: 'Anglais', icon: 'vocab' },
  { to: '/maths', label: 'Maths', icon: 'sigma' },
  { to: '/code', label: 'Code', icon: 'code' },
  { to: '/cfa', label: 'CFA · Finance', icon: 'chart' },
  { to: '/suivi', label: 'Suivi', icon: 'stats' },
];
