/* =========================================================================
   Résumé du lexique — nombre de mots et liste des thèmes, sans les mots.

   Moins d'un kilo-octet : les pages qui ne font qu'annoncer un total (l'accueil,
   par exemple) l'importent d'ici, et le méga-octet du lexique complet reste
   confiné au module Anglais, chargé à la demande.
   ========================================================================= */

import metaRaw from '@/content/lexique-meta.json';
import type { LexTheme } from './types';

const meta = metaRaw as { count: number; themes: LexTheme[] };

export const WORD_COUNT: number = meta.count;
export const LEX_THEMES: LexTheme[] = meta.themes;

/**
 * Libellé court d'un thème, pour les puces de filtre : on garde la tête de
 * l'énumération et on laisse tomber la queue (« Finance, banque, … » → « Finance »).
 */
export function shortTheme(label: string): string {
  return label
    .split(/,| et /)[0]
    .replace(/ de registre soutenu$/, '')
    .trim();
}
