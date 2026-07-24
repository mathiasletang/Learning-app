import type { IconName } from '@/ui/Icon';

export interface NavItem {
  to: string;
  label: string;
  icon: IconName;
  end?: boolean;
}

export const NAV: NavItem[] = [
  { to: '/', label: 'Accueil', icon: 'home', end: true },
  { to: '/parcours', label: 'Parcours', icon: 'tracks' },
  { to: '/cours', label: 'Cours', icon: 'course' },
  { to: '/qcm', label: 'QCM', icon: 'quiz' },
  { to: '/flashcards', label: 'Flashcards', icon: 'cards' },
  { to: '/vocabulaire', label: 'Vocabulaire', icon: 'vocab' },
  { to: '/bibliotheque', label: 'Bibliothèque', icon: 'library' },
  { to: '/notes', label: 'Notes', icon: 'notes' },
  { to: '/stats', label: 'Statistiques', icon: 'stats' },
  { to: '/temps', label: 'Temps', icon: 'clock' },
  { to: '/planning', label: 'Planning', icon: 'calendar' },
];
