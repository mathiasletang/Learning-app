import { useApp } from './store';
import { Button } from '@/ui';
import type { IconName } from '@/ui/Icon';

const NEXT: Record<string, 'light' | 'dark' | 'auto'> = {
  light: 'dark',
  dark: 'auto',
  auto: 'light',
};
const ICON: Record<string, IconName> = { light: 'sun', dark: 'moon', auto: 'auto' };
const LABEL: Record<string, string> = {
  light: 'Thème clair',
  dark: 'Thème sombre',
  auto: 'Thème automatique',
};

export function ThemeToggle() {
  const theme = useApp((s) => s.prefs.theme);
  const setTheme = useApp((s) => s.setTheme);
  return (
    <Button
      variant="ghost"
      icon={ICON[theme]}
      aria-label={`${LABEL[theme]} — changer`}
      title={LABEL[theme]}
      onClick={() => setTheme(NEXT[theme])}
    />
  );
}
