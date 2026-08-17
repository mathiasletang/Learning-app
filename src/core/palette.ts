/* =========================================================================
   Palette dérivée — une couleur d'accent, tous les jetons qui vont avec.

   Le mode « Personnalisé » ne demande qu'une couleur à l'utilisateur. Tout le
   reste — l'encre lisible sur le fond, l'aplat des boutons, le survol, le
   lavis, le halo, l'anneau de focus — se calcule ici.

   Deux principes :

   1. On travaille en OKLCH, pas en HSL. Un bleu et un jaune de même clarté
      HSL n'ont rien à voir à l'œil ; en OKLCH, déplacer la clarté déplace
      vraiment la clarté perçue, quelle que soit la teinte. C'est ce qui fait
      qu'un vert et un violet choisis par l'utilisateur donnent deux palettes
      de même tempérament, et non deux résultats sans rapport.

   2. Les niveaux de clarté ne sont pas des constantes : ils sont CHERCHÉS,
      par dichotomie, jusqu'à ce que le contraste WCAG soit atteint. Une
      couleur pâle est assombrie jusqu'à devenir lisible en texte ; un aplat
      trop clair reçoit une encre sombre plutôt que du blanc. Le contrat
      « AA partout » de tokens.css tient donc aussi pour une couleur que
      l'utilisateur vient d'inventer.

   Module PUR, sans effet de bord, couvert par des tests.
   ========================================================================= */

/** Contraste visé pour le texte : AA sur du corps de texte. */
const AA = 4.6;

/** Fonds neutres de référence — ceux de tokens.css, jamais teintés. */
const REF = {
  light: { canvas: '#f4f5f8', surface: '#fcfcfd', ink: '#14161d', paper: '#fbfbfe' },
  dark: { canvas: '#101218', surface: '#171a22', ink: '#14161d', paper: '#fbfbfe' },
} as const;

export type ThemeBase = 'light' | 'dark';

/** Les six raccourcis proposés sous le sélecteur libre. */
export const ACCENT_PRESETS: { id: string; label: string; hex: string }[] = [
  { id: 'bleu', label: 'Bleu', hex: '#2f6fed' },
  { id: 'violet', label: 'Violet', hex: '#7c4dea' },
  { id: 'vert', label: 'Vert', hex: '#1f9254' },
  { id: 'orange', label: 'Orange', hex: '#e07414' },
  { id: 'rose', label: 'Rose', hex: '#d9418f' },
  { id: 'rouge', label: 'Rouge', hex: '#d93a35' },
];

/** L'indigo de la marque : le point de départ du mode personnalisé. */
export const DEFAULT_ACCENT = '#4f46e5';

/** Curseur d'intensité : 0 = discrète, 1 = intense, 0,5 = le réglage d'usine. */
export const DEFAULT_INTENSITY = 0.5;

/* ------------------------------ Conversions ----------------------------- */

type RGB = [number, number, number];
/** Clarté, chroma, teinte — OKLCH. */
export type OkLch = { l: number; c: number; h: number };

export function parseHex(hex: string): RGB | null {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  let s = m[1];
  if (s.length === 3) s = s[0] + s[0] + s[1] + s[1] + s[2] + s[2];
  return [
    parseInt(s.slice(0, 2), 16) / 255,
    parseInt(s.slice(2, 4), 16) / 255,
    parseInt(s.slice(4, 6), 16) / 255,
  ];
}

/** Une couleur est valable si elle s'écrit en hexadécimal à 3 ou 6 chiffres. */
export function isValidHex(hex: string): boolean {
  return parseHex(hex) !== null;
}

function toHex(rgb: RGB): string {
  const p = (v: number) =>
    Math.round(Math.min(1, Math.max(0, v)) * 255)
      .toString(16)
      .padStart(2, '0');
  return `#${p(rgb[0])}${p(rgb[1])}${p(rgb[2])}`;
}

const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGamma = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

function rgbToOklch([r, g, b]: RGB): OkLch {
  const lr = toLinear(r);
  const lg = toLinear(g);
  const lb = toLinear(b);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return { l: L, c: Math.hypot(A, B), h: Math.atan2(B, A) };
}

function oklchToRgbRaw({ l, c, h }: OkLch): RGB {
  const A = c * Math.cos(h);
  const B = c * Math.sin(h);
  const l_ = (l + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m_ = (l - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s_ = (l - 0.0894841775 * A - 1.291485548 * B) ** 3;
  return [
    toGamma(4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_),
    toGamma(-1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_),
    toGamma(-0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_),
  ];
}

const inGamut = (rgb: RGB) => rgb.every((v) => v >= -0.001 && v <= 1.001);

/**
 * OKLCH vers hexadécimal, en ramenant la couleur dans le gamut sRGB.
 * On sacrifie du chroma, jamais la clarté : la clarté porte la lisibilité,
 * le chroma n'est que du caractère.
 */
function oklchToHex(col: OkLch): string {
  let raw = oklchToRgbRaw(col);
  if (!inGamut(raw)) {
    let lo = 0;
    let hi = col.c;
    for (let i = 0; i < 18; i++) {
      const mid = (lo + hi) / 2;
      if (inGamut(oklchToRgbRaw({ ...col, c: mid }))) lo = mid;
      else hi = mid;
    }
    raw = oklchToRgbRaw({ ...col, c: lo });
  }
  return toHex(raw);
}

export function hexToOklch(hex: string): OkLch {
  return rgbToOklch(parseHex(hex) ?? [0, 0, 0]);
}

/**
 * Chroma maximal atteignable à cette clarté et cette teinte.
 * Sans lui, deux réglages d'intensité différents finissent écrêtés sur la
 * même couleur : le curseur ne ferait plus rien dans les hautes valeurs.
 */
function maxChroma(l: number, h: number): number {
  let lo = 0;
  let hi = 0.4;
  for (let i = 0; i < 16; i++) {
    const mid = (lo + hi) / 2;
    if (inGamut(oklchToRgbRaw({ l, c: mid, h }))) lo = mid;
    else hi = mid;
  }
  return lo;
}

/* ------------------------------- Contraste ------------------------------ */

function luminance(rgb: RGB): number {
  const [r, g, b] = rgb.map(toLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Rapport de contraste WCAG entre deux couleurs hexadécimales. */
export function contrast(a: string, b: string): number {
  const la = luminance(parseHex(a) ?? [0, 0, 0]);
  const lb = luminance(parseHex(b) ?? [0, 0, 0]);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Cherche la clarté la plus proche de `from` qui atteint le contraste visé
 * face à `against`, en se déplaçant dans la direction indiquée.
 * Retourne null si même le bout de l'échelle n'y suffit pas.
 */
function seekLightness(
  col: OkLch,
  against: string,
  target: number,
  direction: 'darker' | 'lighter',
): OkLch | null {
  const limit = direction === 'darker' ? 0.06 : 0.99;
  if (contrast(oklchToHex({ ...col, l: limit }), against) < target) return null;
  if (contrast(oklchToHex(col), against) >= target) return col;

  let lo = col.l;
  let hi = limit;
  for (let i = 0; i < 22; i++) {
    const mid = (lo + hi) / 2;
    if (contrast(oklchToHex({ ...col, l: mid }), against) >= target) hi = mid;
    else lo = mid;
  }
  return { ...col, l: hi };
}

/* ------------------------------- Dérivation ----------------------------- */

export interface Palette {
  accent: string; // encre : liens, titres actifs, chiffres mis en avant
  accentDeep: string; // insistance d'un cran
  accentSolid: string; // aplat des commandes
  accentSolid2: string; // second arrêt du dégradé
  accentHover: string; // aplat au survol
  onAccent: string; // encre POSÉE sur l'aplat
  accentWash: string; // fond très léger, teinté juste ce qu'il faut
  accentGlow: string; // halo des commandes principales
  ring: string; // anneau de focus
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Toute la palette à partir d'une seule couleur.
 *
 * `intensity` (0 → 1) ne touche que le chroma : à 0 la teinte s'efface
 * presque, à 1 elle s'affirme. Elle ne touche ni la clarté ni le contraste —
 * une interface discrète reste aussi lisible qu'une interface franche.
 */
export function derivePalette(
  hex: string,
  base: ThemeBase,
  intensity: number = DEFAULT_INTENSITY,
): Palette {
  const ref = REF[base];
  const k = clamp01(intensity);
  const src = hexToOklch(isValidHex(hex) ? hex : DEFAULT_ACCENT);
  /* Le chroma d'origine reste le centre de gravité : le curseur l'entoure. */
  const seed: OkLch = { ...src, c: src.c * (0.68 + 0.62 * k) };

  /* --- L'encre : lisible sur le plus exigeant des deux fonds. En clair, une
         encre sombre souffre sur le fond le plus SOMBRE (le canevas) ; en
         sombre, une encre claire souffre sur le fond le plus CLAIR (la
         surface posée). Ce n'est pas le même fond des deux côtés. -------- */
  const inkAgainst = base === 'light' ? ref.canvas : ref.surface;
  const accent =
    seekLightness(seed, inkAgainst, AA, base === 'light' ? 'darker' : 'lighter') ??
    ({ ...seed, l: base === 'light' ? 0.06 : 0.99 } as OkLch);

  /* --- L'aplat : on garde la couleur au plus près de sa clarté naturelle,
         et l'on choisit l'encre qui demande le moins de déplacement. ------ */
  const onPaper = seekLightness(seed, ref.paper, AA, 'darker');
  const onInk = seekLightness(seed, ref.ink, AA, 'lighter');
  const costPaper = onPaper ? Math.abs(onPaper.l - seed.l) : Infinity;
  const costInk = onInk ? Math.abs(onInk.l - seed.l) : Infinity;
  const useLightInk = costPaper <= costInk;
  const solid = (useLightInk ? onPaper : onInk) ?? ({ ...seed, l: 0.5 } as OkLch);
  const onAccent = useLightInk ? ref.paper : ref.ink;

  /* --- Survol : plus dense en clair, plus lumineux en sombre — mais jamais
         au prix de l'encre qu'il porte, d'où le rappel à la limite AA. --- */
  const shifted: OkLch = { ...solid, l: clamp01(solid.l + (base === 'light' ? -0.045 : 0.05)) };
  const hover = seekLightness(shifted, onAccent, AA, useLightInk ? 'darker' : 'lighter') ?? solid;
  /* Le dégradé s'éclaire et pivote d'un rien : un aplat plat fait plastique. */
  const solid2: OkLch = { ...solid, l: clamp01(solid.l + 0.055), h: solid.h + 0.14 };
  const deep: OkLch = { ...accent, l: clamp01(accent.l + (base === 'light' ? -0.055 : 0.06)) };

  /* --- Le lavis : une teinte, pas une couleur. On l'exprime en fraction du
         chroma atteignable à cette clarté, sinon l'intensité disparaît,
         écrêtée par le gamut. ------------------------------------------- */
  const washL = base === 'light' ? 0.945 : 0.245;
  const wash: OkLch = {
    ...seed,
    l: washL,
    c: Math.min(seed.c, maxChroma(washL, seed.h)) * (0.3 + 0.7 * k),
  };

  const solidHex = oklchToHex(solid);
  const glowRgb = parseHex(solidHex) ?? [0, 0, 0];
  const glowAlpha = base === 'light' ? 0.28 : 0.34;

  return {
    accent: oklchToHex(accent),
    accentDeep: oklchToHex(deep),
    accentSolid: solidHex,
    accentSolid2: oklchToHex(solid2),
    accentHover: oklchToHex(hover),
    onAccent,
    accentWash: oklchToHex(wash),
    accentGlow: `rgba(${glowRgb.map((v) => Math.round(v * 255)).join(', ')}, ${glowAlpha})`,
    ring: base === 'light' ? solidHex : oklchToHex(accent),
  };
}

/**
 * Les couleurs d'identité des matières — anglais teal, maths bleu, CFA
 * cuivre… En mode personnalisé, elles suivent la couleur choisie : la page
 * entière est à vous, onglets et pastilles de matière compris.
 *
 * Ce qui est SÉMANTIQUE ne suit pas : réussite, erreur, mise en garde et
 * priorité d'un concept gardent leurs jetons propres. Une couleur préférée
 * ne doit pas rendre un avertissement illisible comme avertissement.
 */
const SUBJECT_VARS = ['--d-en', '--m-opt', '--m-pre', '--m-eco', '--m-fin', '--m-cfa', '--m-code'];

/** La palette telle que la lisent les feuilles de style : des jetons CSS. */
export function paletteVars(p: Palette): Record<string, string> {
  return {
    ...Object.fromEntries(SUBJECT_VARS.map((v) => [v, p.accent])),
    '--accent': p.accent,
    '--accent-deep': p.accentDeep,
    '--accent-ink': p.accentDeep,
    '--accent-solid': p.accentSolid,
    '--accent-solid-2': p.accentSolid2,
    '--accent-hover': p.accentHover,
    '--on-accent': p.onAccent,
    '--accent-wash': p.accentWash,
    '--accent-glow': p.accentGlow,
    '--ring': p.ring,
  };
}
