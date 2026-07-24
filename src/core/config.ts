/* Configuration utilisateur — Cours avancés */

/** Dossier Google Drive où sont rangés les PDF (partagé par l'utilisateur).
    Cliquer sur un document lance une recherche Drive sur son nom de fichier. */
export const DRIVE_FOLDER_URL =
  'https://drive.google.com/drive/folders/1t_0_dL5wZqW8mS8rSS-hLBvx_QyViAPm';

/** Construit l'URL de recherche Drive pour un nom de fichier. */
export function driveSearchUrl(fileName: string): string {
  const stem = fileName.replace(/\.[a-z0-9]+$/i, '');
  return `https://drive.google.com/drive/search?q=${encodeURIComponent(stem)}`;
}
