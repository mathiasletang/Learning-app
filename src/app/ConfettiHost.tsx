import { useEffect, useState } from 'react';
import { useApp } from './store';

interface Piece {
  id: number;
  left: number;
  delay: number;
  dur: number;
  color: string;
}

/* Palette retenue : les confettis restent dans le monde chromatique de l'app. */
const COLORS = ['--accent', '--m-fin', '--m-cfa', '--positive', '--ink-3'];

export function ConfettiHost() {
  const nonce = useApp((s) => s.confettiNonce);
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (nonce === 0) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    setPieces(
      Array.from({ length: 60 }, (_, i) => ({
        id: nonce * 1000 + i,
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        dur: 2 + Math.random() * 1.6,
        color: COLORS[i % COLORS.length],
      })),
    );
    const t = setTimeout(() => setPieces([]), 4200);
    return () => clearTimeout(t);
  }, [nonce]);

  if (!pieces.length) return null;
  return (
    <div className="confetti" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti__piece"
          style={{
            left: `${p.left}%`,
            background: `var(${p.color})`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  );
}
