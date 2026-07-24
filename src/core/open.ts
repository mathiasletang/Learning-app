/* Analyse des ressources de parcours (cours/qcm/pdf/page).
   Les chemins de PDF sont relatifs au dossier parent « Mathématiques avancées/ ».
   L'ouverture effective est gérée par openResource (couche app). */

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
