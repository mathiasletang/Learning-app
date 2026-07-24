/* Jeu d'icônes (SVG inline, sans dépendance). Traits, hérite de currentColor. */

export type IconName =
  | 'home'
  | 'tracks'
  | 'course'
  | 'quiz'
  | 'cards'
  | 'vocab'
  | 'library'
  | 'notes'
  | 'stats'
  | 'clock'
  | 'calendar'
  | 'sun'
  | 'moon'
  | 'auto'
  | 'menu'
  | 'check'
  | 'x'
  | 'chevronRight'
  | 'chevronDown'
  | 'download'
  | 'upload'
  | 'trash'
  | 'plus'
  | 'search'
  | 'flame'
  | 'star'
  | 'target'
  | 'play'
  | 'settings'
  | 'external'
  | 'book'
  | 'refresh'
  | 'arrowLeft';

const P: Record<IconName, string> = {
  home: 'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10',
  tracks: 'M4 6h16M4 12h16M4 18h10',
  course: 'M4 5h11a2 2 0 012 2v12a2 2 0 00-2-2H4zM4 5v12M20 7v12a2 2 0 01-2 2',
  quiz: 'M9 9a3 3 0 114 2.8c-.8.4-1 .9-1 1.7M12 17h.01M4 4h16v12H8l-4 4z',
  cards: 'M4 7h11v11H4zM8 4h11v11',
  vocab: 'M4 5h16v14H4zM8 9h8M8 13h5',
  library: 'M5 4h3v16H5zM10 4h3v16h-3zM16 5l3 15',
  notes: 'M6 3h9l4 4v14H6zM14 3v5h5M9 13h6M9 17h4',
  stats: 'M5 20V10M12 20V4M19 20v-7',
  clock: 'M12 7v5l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  calendar: 'M4 6h16v15H4zM4 10h16M8 3v4M16 3v4',
  sun: 'M12 4V2M12 22v-2M4 12H2M22 12h-2M5 5L4 4M20 20l-1-1M19 5l1-1M4 20l1-1M12 8a4 4 0 100 8 4 4 0 000-8z',
  moon: 'M21 12.5A8.5 8.5 0 1111.5 3a6.5 6.5 0 009.5 9.5z',
  auto: 'M12 3a9 9 0 000 18zM12 3a9 9 0 010 18',
  menu: 'M4 7h16M4 12h16M4 17h16',
  check: 'M5 13l4 4L19 7',
  x: 'M6 6l12 12M18 6L6 18',
  chevronRight: 'M9 6l6 6-6 6',
  chevronDown: 'M6 9l6 6 6-6',
  download: 'M12 3v12M7 11l5 5 5-5M5 21h14',
  upload: 'M12 21V9M7 13l5-5 5 5M5 3h14',
  trash: 'M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14',
  plus: 'M12 5v14M5 12h14',
  search: 'M11 4a7 7 0 105.3 12.3L21 21M11 4a7 7 0 010 14',
  flame: 'M12 3c2 3 5 4 5 8a5 5 0 11-10 0c0-2 1-3 2-4 .5 1 1 1.5 2 2 0-2-1-4-1-6z',
  star: 'M12 3l2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z',
  target: 'M12 3a9 9 0 100 18 9 9 0 000-18zM12 8a4 4 0 100 8 4 4 0 000-8zM12 12h.01',
  play: 'M7 5l12 7-12 7z',
  settings:
    'M12 9a3 3 0 100 6 3 3 0 000-6zM19 12a7 7 0 00-.1-1l2-1.5-2-3.4-2.3 1a7 7 0 00-1.7-1L14.5 2h-5l-.4 2.6a7 7 0 00-1.7 1l-2.3-1-2 3.4 2 1.5a7 7 0 000 2l-2 1.5 2 3.4 2.3-1a7 7 0 001.7 1l.4 2.6h5l.4-2.6a7 7 0 001.7-1l2.3 1 2-3.4-2-1.5c.1-.3.1-.7.1-1z',
  external: 'M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5',
  book: 'M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zM19 3v16',
  refresh: 'M21 12a9 9 0 01-9 9 9 9 0 01-6.7-3M3 12a9 9 0 019-9 9 9 0 016.7 3M4 4v5h5M20 20v-5h-5',
  arrowLeft: 'M19 12H5M11 6l-6 6 6 6',
};

interface Props {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
  'aria-hidden'?: boolean;
}

export function Icon({ name, size = 20, strokeWidth = 1.8, className, ...rest }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={rest['aria-hidden'] ?? true}
      focusable="false"
    >
      <path d={P[name]} />
    </svg>
  );
}
