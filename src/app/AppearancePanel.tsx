import { useId } from 'react';
import { useApp } from './store';
import { Icon, Modal } from '@/ui';
import type { IconName } from '@/ui/Icon';
import type { ThemeChoice, UserPrefs } from '@/core/types';
import { ACCENT_PRESETS, DEFAULT_ACCENT, DEFAULT_INTENSITY, isValidHex } from '@/core/palette';
import './appearance.css';

const MODES: { value: ThemeChoice; label: string; icon: IconName }[] = [
  { value: 'light', label: 'Clair', icon: 'sun' },
  { value: 'dark', label: 'Sombre', icon: 'moon' },
  { value: 'auto', label: 'Automatique', icon: 'auto' },
  { value: 'custom', label: 'Personnalisé', icon: 'palette' },
];

const BASES: { value: NonNullable<UserPrefs['customBase']>; label: string }[] = [
  { value: 'auto', label: 'Système' },
  { value: 'light', label: 'Clair' },
  { value: 'dark', label: 'Sombre' },
];

/**
 * Le panneau d'apparence : quatre modes, et — pour le mode personnalisé — la
 * couleur d'accent, son intensité et le fond neutre qui la porte.
 *
 * Tout s'applique à la frappe : il n'y a rien à valider. La couleur ne teinte
 * que la famille --accent-* ; fonds, encres et filets restent ceux de
 * tokens.css, et les couleurs de matière gardent les leurs.
 */
export function AppearancePanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const prefs = useApp((s) => s.prefs);
  const setTheme = useApp((s) => s.setTheme);
  const setAccent = useApp((s) => s.setAccent);
  const setAccentIntensity = useApp((s) => s.setAccentIntensity);
  const setCustomBase = useApp((s) => s.setCustomBase);
  const pickerId = useId();
  const rangeId = useId();

  const accent = prefs.accent ?? DEFAULT_ACCENT;
  const intensity = prefs.accentIntensity ?? DEFAULT_INTENSITY;
  const custom = prefs.theme === 'custom';

  return (
    <Modal open={open} onClose={onClose} title="Apparence">
      <div className="appear__modes" role="radiogroup" aria-label="Mode d'apparence">
        {MODES.map((m) => (
          <button
            key={m.value}
            type="button"
            role="radio"
            aria-checked={prefs.theme === m.value}
            className="appear__mode"
            onClick={() => setTheme(m.value)}
          >
            <Icon name={m.icon} size={18} />
            <span className="appear__label">{m.label}</span>
            {prefs.theme === m.value && <Icon name="check" size={15} strokeWidth={2.2} />}
          </button>
        ))}
      </div>

      {custom && (
        <div className="appear__tune">
          <div className="appear__head">
            <label className="eyebrow" htmlFor={pickerId}>
              Couleur d'accent
            </label>
            <span className="micro appear__hex">{accent.toUpperCase()}</span>
          </div>

          <div className="appear__swatches">
            {ACCENT_PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                className="appear__swatch"
                style={{ '--_c': p.hex } as React.CSSProperties}
                aria-label={p.label}
                aria-pressed={accent.toLowerCase() === p.hex.toLowerCase()}
                onClick={() => setAccent(p.hex)}
              />
            ))}
            {/* Le choix libre : la pastille EST le sélecteur natif. */}
            <span className="appear__swatch appear__swatch--free" style={{ '--_c': accent } as React.CSSProperties}>
              <input
                id={pickerId}
                type="color"
                value={isValidHex(accent) ? accent : DEFAULT_ACCENT}
                aria-label="Choisir une couleur libre"
                onChange={(e) => setAccent(e.target.value)}
              />
              <Icon name="plus" size={14} />
            </span>
          </div>

          <div className="appear__row">
            <label className="eyebrow" htmlFor={rangeId}>
              Intensité
            </label>
            <span className="micro">Discrète</span>
            <input
              id={rangeId}
              className="appear__slider"
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={intensity}
              onChange={(e) => setAccentIntensity(Number(e.target.value))}
            />
            <span className="micro">Intense</span>
          </div>

          <div className="appear__row">
            <span className="eyebrow" id={`${rangeId}-fond`}>
              Fond neutre
            </span>
            <span className="chips" role="group" aria-labelledby={`${rangeId}-fond`}>
              {BASES.map((b) => (
                <button
                  key={b.value}
                  type="button"
                  className="chip"
                  aria-pressed={(prefs.customBase ?? 'auto') === b.value}
                  onClick={() => setCustomBase(b.value)}
                >
                  {b.label}
                </button>
              ))}
            </span>
          </div>

          <p className="micro appear__note">
            La couleur sert d'accent : commandes, éléments actifs, liens, jauges et petits signes.
            Les fonds restent neutres, et chaque matière garde sa propre couleur.
          </p>
        </div>
      )}
    </Modal>
  );
}
