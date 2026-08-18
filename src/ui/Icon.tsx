/* Icônes — Lucide, traits fins, tailles constantes. Une seule famille. */

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  Circle,
  CircleDot,
  Clock,
  Download,
  Flame,
  Layers,
  LayoutGrid,
  Library,
  LineChart,
  Menu,
  Moon,
  NotebookPen,
  Palette,
  Play,
  Plus,
  RotateCcw,
  Search,
  Dumbbell,
  GraduationCap,
  Heart,
  Handshake,
  Sigma,
  SlidersHorizontal,
  Shuffle,
  Sparkles,
  SquareStack,
  Sun,
  Target,
  Terminal,
  TrendingUp,
  Trash2,
  Type,
  Upload,
  X,
  type LucideIcon,
} from 'lucide-react';

const MAP = {
  home: LayoutGrid,
  tracks: Layers,
  course: BookOpen,
  quiz: CircleDot,
  cards: SquareStack,
  vocab: Type,
  library: Library,
  notes: NotebookPen,
  palette: Palette,
  stats: LineChart,
  clock: Clock,
  calendar: Calendar,
  sun: Sun,
  moon: Moon,
  auto: Circle,
  menu: Menu,
  check: Check,
  x: X,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  external: ArrowUpRight,
  download: Download,
  upload: Upload,
  trash: Trash2,
  plus: Plus,
  search: Search,
  school: GraduationCap,
  heart: Heart,
  sport: Dumbbell,
  meeting: Handshake,
  flame: Flame,
  sparkle: Sparkles,
  target: Target,
  play: Play,
  refresh: RotateCcw,
  shuffle: Shuffle,
  settings: SlidersHorizontal,
  book: BookOpen,
  sigma: Sigma,
  code: Terminal,
  chart: TrendingUp,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof MAP;

interface Props {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function Icon({ name, size = 18, strokeWidth = 1.5, className }: Props) {
  const C = MAP[name];
  return <C size={size} strokeWidth={strokeWidth} className={className} aria-hidden />;
}
