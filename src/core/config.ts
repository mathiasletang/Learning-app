/* Configuration utilisateur — Cours avancés */

import COURS_LOCAUX from '@/content/cours-locaux.json';

/** Dossier Google Drive où sont rangés les PDF (partagé par l'utilisateur).
    Cliquer sur un document lance une recherche Drive sur son nom de fichier. */
export const DRIVE_FOLDER_URL =
  'https://drive.google.com/drive/folders/1t_0_dL5wZqW8mS8rSS-hLBvx_QyViAPm';

/** Construit l'URL de recherche Drive pour un nom de fichier. */
export function driveSearchUrl(fileName: string): string {
  const stem = fileName.replace(/\.[a-z0-9]+$/i, '');
  return `https://drive.google.com/drive/search?q=${encodeURIComponent(stem)}`;
}

/**
 * PDF servis par l'application elle-même (déposés dans `public/cours/`).
 * Ceux-ci s'ouvrent directement, sans passer par Drive : chemin du catalogue
 * → URL servie. Le polycopié L3 est le cours de référence du parcours.
 *
 * Les deux cours L3 sont écrits ici, à la main : ce sont les textes centraux.
 * Le reste — les documents que le parcours pointe explicitement — vient de
 * `cours-locaux.json`, régénéré par `npm run cours`. Les 718 autres documents
 * du catalogue restent dans Drive : ils pèsent 663 Mo et ne sont consultés
 * qu'occasionnellement.
 */
export const LOCAL_PDFS: Record<string, string> = {
  ...COURS_LOCAUX,
  '00_L3_Toulon_Faccanoni/cours_L3_Faccanoni.pdf': 'cours/cours_L3_Faccanoni.pdf',
  '00_L3_Universite-Paris-Cite_Garrigos/cours_optim_L3.pdf': 'cours/cours_optim_L3.pdf',
  'CFA/2024 L1 Quick Sheet.pdf': 'cours/cfa_L1_quick_sheet_2024.pdf',
};

/** URL locale d'un document, si l'application l'héberge. */
export function localPdfUrl(path: string): string | null {
  const rel = LOCAL_PDFS[path];
  if (!rel) return null;
  // `import.meta.env.BASE_URL` gère un déploiement en sous-dossier.
  return `${import.meta.env.BASE_URL}${rel}`;
}
