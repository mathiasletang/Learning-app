import { describe, it, expect } from 'vitest';
import {
  ACCENT_PRESETS,
  DEFAULT_ACCENT,
  contrast,
  derivePalette,
  hexToOklch,
  isValidHex,
  paletteVars,
  type ThemeBase,
} from './palette';

const CANVAS = { light: '#f4f5f8', dark: '#101218' };
const SURFACE = { light: '#fcfcfd', dark: '#171a22' };
const BASES: ThemeBase[] = ['light', 'dark'];

/* Un échantillon large : les six raccourcis, l'indigo de la marque, et
   quelques cas hostiles — un jaune très clair, un gris sans teinte, un noir. */
const COLORS = [
  ...ACCENT_PRESETS.map((p) => p.hex),
  DEFAULT_ACCENT,
  '#ffe600',
  '#00e5ff',
  '#8a8f98',
  '#000000',
  '#ffffff',
];

describe('Palette dérivée — le contrat de lisibilité', () => {
  it('rend l’encre d’accent lisible sur le fond et sur les surfaces', () => {
    for (const base of BASES) {
      for (const hex of COLORS) {
        for (const k of [0, 0.5, 1]) {
          const p = derivePalette(hex, base, k);
          expect(contrast(p.accent, CANVAS[base])).toBeGreaterThanOrEqual(4.5);
          expect(contrast(p.accent, SURFACE[base])).toBeGreaterThanOrEqual(4.5);
        }
      }
    }
  });

  it('garantit l’encre posée sur l’aplat des commandes', () => {
    for (const base of BASES) {
      for (const hex of COLORS) {
        const p = derivePalette(hex, base, 0.5);
        expect(contrast(p.onAccent, p.accentSolid)).toBeGreaterThanOrEqual(4.5);
        expect(contrast(p.onAccent, p.accentHover)).toBeGreaterThanOrEqual(4);
      }
    }
  });

  it('garde le lavis dans le registre du fond — un fond, pas un aplat', () => {
    for (const hex of COLORS) {
      const clair = derivePalette(hex, 'light', 1);
      // Le lavis clair reste très clair : le texte d'encre courante s'y pose.
      expect(contrast('#1a1d26', clair.accentWash)).toBeGreaterThanOrEqual(4.5);
      const sombre = derivePalette(hex, 'dark', 1);
      expect(contrast('#e9ebf2', sombre.accentWash)).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('conserve la teinte choisie — un violet ne devient pas bleu', () => {
    for (const base of BASES) {
      for (const hex of ACCENT_PRESETS.map((p) => p.hex)) {
        const source = hexToOklch(hex);
        const p = derivePalette(hex, base, 0.5);
        for (const derived of [p.accent, p.accentSolid, p.accentHover]) {
          const ecart = Math.abs(hexToOklch(derived).h - source.h);
          expect(Math.min(ecart, 2 * Math.PI - ecart)).toBeLessThan(0.2); // ≈ 11°
        }
      }
    }
  });

  it('module le chroma avec l’intensité, sans toucher au contraste', () => {
    const discrete = derivePalette('#7c4dea', 'light', 0);
    const intense = derivePalette('#7c4dea', 'light', 1);
    expect(hexToOklch(discrete.accentSolid).c).toBeLessThan(hexToOklch(intense.accentSolid).c);
    expect(hexToOklch(discrete.accentWash).c).toBeLessThan(hexToOklch(intense.accentWash).c);
    for (const p of [discrete, intense]) {
      expect(contrast(p.accent, SURFACE.light)).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('produit des couleurs valables, et toujours les mêmes', () => {
    const a = paletteVars(derivePalette('#2f6fed', 'dark', 0.5));
    const b = paletteVars(derivePalette('#2f6fed', 'dark', 0.5));
    expect(a).toEqual(b);
    for (const [nom, valeur] of Object.entries(a)) {
      if (nom === '--accent-glow') expect(valeur).toMatch(/^rgba\(/);
      else expect(isValidHex(valeur)).toBe(true);
    }
  });

  it('emporte les couleurs de matière, mais pas les couleurs sémantiques', () => {
    const v = paletteVars(derivePalette('#7c4dea', 'light', 0.5));
    // La page entière suit la couleur : anglais, maths, CFA, code…
    for (const nom of ['--d-en', '--m-opt', '--m-pre', '--m-eco', '--m-fin', '--m-cfa', '--m-code']) {
      expect(v[nom]).toBe(v['--accent']);
    }
    // Réussite, erreur et mise en garde restent hors de portée.
    for (const nom of ['--positive', '--negative', '--warn', '--warn-soft']) {
      expect(v).not.toHaveProperty(nom);
    }
  });

  it('refuse les saisies qui n’en sont pas, sans casser', () => {
    expect(isValidHex('#abc')).toBe(true);
    expect(isValidHex('rouge')).toBe(false);
    expect(isValidHex('#12345')).toBe(false);
    // Une saisie invalide retombe sur l'indigo de la marque.
    expect(derivePalette('pas une couleur', 'light')).toEqual(
      derivePalette(DEFAULT_ACCENT, 'light'),
    );
  });
});
