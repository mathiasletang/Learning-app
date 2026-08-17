/* « 2027 dans N jours » — la sensation du temps qui passe, sans widget criard.
   Une ligne, trois pixels de barre. Partagée entre l'accueil et les matières. */

interface Props {
  now?: Date;
}

export function YearLine({ now = new Date() }: Props) {
  const year = now.getFullYear();
  const nextYear = new Date(year + 1, 0, 1);
  const start = new Date(year, 0, 1);
  const days = Math.ceil((nextYear.getTime() - now.getTime()) / 86_400_000);
  const pct = (now.getTime() - start.getTime()) / (nextYear.getTime() - start.getTime());

  return (
    <p className="year-line meta">
      <span className="tnum">
        {year + 1} dans {days} jour{days > 1 ? 's' : ''}
      </span>
      <span className="year-line__bar" aria-hidden>
        <span className="year-line__fill" style={{ width: `${pct * 100}%` }} />
      </span>
      <span className="tnum">
        {Math.round(pct * 100)} % de {year} écoulés
      </span>
    </p>
  );
}
