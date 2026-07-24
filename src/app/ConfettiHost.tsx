import { useEffect, useState } from 'react';
import { useApp } from './store';

interface Piece {
  id: number;
  left: number;
  delay: number;
  dur: number;
  color: string;
  rot: number;
}

const COLORS = ['--accent', '--subj-fin', '--subj-cfa', '--good', '--warn'];

export function ConfettiHost() {
  const nonce = useApp((s) => s.confettiNonce);
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (nonce === 0) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const batch: Piece[] = Array.from({ length: 80 }, (_, i) => ({
      id: nonce * 1000 + i,
      left: Math.random() * 100,
      delay: Math.random() * 0.3,
      dur: 1.6 + Math.random() * 1.4,
      color: COLORS[i % COLORS.length],
      rot: Math.random() * 360,
    }));
    setPieces(batch);
    const t = setTimeout(() => setPieces([]), 3400);
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
            transform: `rotate(${p.rot}deg)`,
          }}
        />
      ))}
    </div>
  );
}
