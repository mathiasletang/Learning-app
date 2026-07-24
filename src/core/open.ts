/* Ouverture d'un document (PDF/HTML) dans le lecteur du système / navigateur.
   Les chemins sont relatifs au dossier parent « Mathématiques avancées/ ».
   L'app n'embarque pas de visionneuse : on tente simplement d'ouvrir le chemin. */

export function openDocument(path: string): void {
  const url = encodeURI(path);
  try {
    window.open(url, '_blank', 'noopener');
  } catch {
    location.href = url;
  }
}

export type ResourceKind = 'course' | 'quiz' | 'pdf' | 'page';

export interface ParsedResource {
  kind: ResourceKind;
  target: string; // id de cours, banque, ou chemin
}

/** Analyse une ressource de parcours (r[i][0]). */
export function parseResource(res: string): ParsedResource {
  if (res.startsWith('cours:')) return { kind: 'course', target: res.slice(6) };
  if (res.startsWith('qcm:')) return { kind: 'quiz', target: res.slice(4) };
  if (res.toLowerCase().endsWith('.html')) return { kind: 'page', target: res };
  return { kind: 'pdf', target: res };
}
