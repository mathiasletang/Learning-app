import { useState } from 'react';
import { useApp } from './store';
import { Button } from '@/ui';
import type { IconName } from '@/ui/Icon';
import { AppearancePanel } from './AppearancePanel';

const ICON: Record<string, IconName> = {
  light: 'sun',
  dark: 'moon',
  auto: 'auto',
  custom: 'palette',
};
const LABEL: Record<string, string> = {
  light: 'Thème clair',
  dark: 'Thème sombre',
  auto: 'Thème automatique',
  custom: 'Thème personnalisé',
};

/** Un seul bouton dans la barre, qui ouvre le panneau d'apparence. */
export function ThemeToggle() {
  const theme = useApp((s) => s.prefs.theme);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="ghost"
        icon={ICON[theme] ?? 'sun'}
        aria-label={`${LABEL[theme] ?? 'Apparence'} — ouvrir l'apparence`}
        title="Apparence"
        onClick={() => setOpen(true)}
      />
      <AppearancePanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}
