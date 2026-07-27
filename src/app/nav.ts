import type { IconName } from '@/ui/Icon';

export interface NavItem {
  to: string;
  label: string;
  icon: IconName;
  end?: boolean;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

/** Navigation groupée — un sommaire, pas une liste de onze onglets. */
export const NAV: NavGroup[] = [
  {
    label: 'Étudier',
    items: [
      { to: '/', label: 'Accueil', icon: 'home', end: true },
      { to: '/parcours', label: 'Parcours', icon: 'tracks' },
      { to: '/cours', label: 'Cours', icon: 'course' },
      { to: '/qcm', label: 'Questions', icon: 'quiz' },
    ],
  },
  {
    label: 'Mémoriser',
    items: [
      { to: '/flashcards', label: 'Flashcards', icon: 'cards' },
      { to: '/vocabulaire', label: 'Vocabulaire', icon: 'vocab' },
    ],
  },
  {
    label: 'Ressources',
    items: [
      { to: '/bibliotheque', label: 'Bibliothèque', icon: 'library' },
      { to: '/notes', label: 'Notes', icon: 'notes' },
    ],
  },
  {
    label: 'Suivi',
    items: [
      { to: '/stats', label: 'Statistiques', icon: 'stats' },
      { to: '/temps', label: 'Temps', icon: 'clock' },
      { to: '/planning', label: 'Planning', icon: 'calendar' },
    ],
  },
];

export const ALL_NAV_ITEMS: NavItem[] = NAV.flatMap((g) => g.items);
