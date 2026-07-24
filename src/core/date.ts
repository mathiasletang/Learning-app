/* Utilitaires de dates — clés locales YYYY-MM-DD (pas d'UTC pour coller au fuseau). */

export function toDayStr(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function parseDay(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(day: string, n: number): string {
  const d = parseDay(day);
  d.setDate(d.getDate() + n);
  return toDayStr(d);
}

/** Nombre de jours entiers de `a` à `b` (b - a). */
export function daysBetween(a: string, b: string): number {
  const ms = parseDay(b).getTime() - parseDay(a).getTime();
  return Math.round(ms / 86400000);
}

export function isBeforeOrEqual(a: string, b: string): boolean {
  return a <= b;
}
