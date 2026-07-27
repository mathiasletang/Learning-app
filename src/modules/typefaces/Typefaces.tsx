import { useState } from 'react';
import { PageHead, Tabs, Icon, Tag, Gauge } from '@/ui';
import './typefaces.css';

/**
 * Page temporaire de comparaison de polices de texte.
 * Chaque panneau montre EXACTEMENT les mêmes éléments de l'application, dans
 * une famille différente, pour trancher à l'œil. Les titres restent en
 * Instrument Serif : seule la police de texte change.
 */

interface Candidate {
  id: string;
  name: string;
  stack: string;
  note: string;
}

const CANDIDATES: Candidate[] = [
  {
    id: 'poppins',
    name: 'Poppins',
    stack: "'Poppins', sans-serif",
    note: 'Géométrique et ronde. La plus proche des sites corporate — c’est mon hypothèse principale au vu de ta capture.',
  },
  {
    id: 'jakarta',
    name: 'Plus Jakarta Sans',
    stack: "'Plus Jakarta Sans Variable', sans-serif",
    note: 'Géométrique mais plus fine et moins « bulle ». Très courante sur les sites d’entreprise récents.',
  },
  {
    id: 'dmsans',
    name: 'DM Sans',
    stack: "'DM Sans Variable', sans-serif",
    note: 'Géométrique sobre, un peu plus resserrée. Élégante en petits corps.',
  },
  {
    id: 'manrope',
    name: 'Manrope',
    stack: "'Manrope Variable', sans-serif",
    note: 'La police actuelle. Humaniste et douce, pensée pour la lecture longue.',
  },
];

/** Un échantillon fidèle de l'application, rendu dans une police donnée. */
function Sample({ c }: { c: Candidate }) {
  return (
    <article className="tf" style={{ fontFamily: c.stack }}>
      <header className="tf__head">
        <div>
          <p className="eyebrow" style={{ fontFamily: c.stack }}>
            {c.name}
          </p>
          <p className="meta tf__note" style={{ fontFamily: c.stack }}>
            {c.note}
          </p>
        </div>
      </header>

      <p className="lead" style={{ fontFamily: c.stack }}>
        Trois parcours, 897 questions et 929 mots vous attendent. Une séance courte vaut mieux
        qu'une longue remise à demain.
      </p>

      <div className="tf__figures">
        <div>
          <span className="figure__value tnum">0/20</span>
          <span className="eyebrow figure__label" style={{ fontFamily: c.stack }}>
            Objectif du jour
          </span>
        </div>
        <div>
          <span className="figure__value tnum">76 %</span>
          <span className="eyebrow figure__label" style={{ fontFamily: c.stack }}>
            Précision
          </span>
        </div>
      </div>

      <div className="tf__block">
        <p className="tf__label" style={{ fontFamily: c.stack }}>
          Un paragraphe de cours
        </p>
        <p className="tf__prose" style={{ fontFamily: c.stack }}>
          Plutôt que d'interdire de violer les contraintes, on les <strong>tarife</strong>. Chaque
          multiplicateur est le prix à payer pour dépasser une contrainte d'une unité. Si vous la
          respectez largement, vous êtes même récompensé. C'est la transformation d'un problème
          contraint en une famille de problèmes libres, indexée par les prix.
        </p>
      </div>

      <div className="tf__block">
        <p className="tf__label" style={{ fontFamily: c.stack }}>
          Éléments d'interface
        </p>
        <div className="row row--wrap" style={{ gap: 'var(--s-3)' }}>
          <button className="btn btn--primary" style={{ fontFamily: c.stack }} type="button">
            Commencer
          </button>
          <button className="btn btn--secondary" style={{ fontFamily: c.stack }} type="button">
            Toutes les banques
          </button>
          <span className="chip" style={{ fontFamily: c.stack }}>
            Dualité et KKT <span className="chip__count">49</span>
          </span>
        </div>
        <div className="row" style={{ gap: 'var(--s-4)', marginTop: 'var(--s-5)' }}>
          <Tag colorVar="--m-opt">Optimisation</Tag>
          <span className="micro tnum" style={{ fontFamily: c.stack }}>
            240 questions · 8 thèmes
          </span>
          <span className="spacer" />
          <span className="arrow-link" style={{ fontFamily: c.stack }}>
            Continuer <Icon name="arrowRight" size={16} />
          </span>
        </div>
        <div style={{ marginTop: 'var(--s-5)', maxWidth: 220 }}>
          <Gauge value={0.62} colorVar="--m-opt" thick />
        </div>
      </div>
    </article>
  );
}

export function Typefaces() {
  const [mode, setMode] = useState<'grid' | 'solo'>('grid');
  const [solo, setSolo] = useState(CANDIDATES[0].id);

  return (
    <>
      <PageHead
        eyebrow="Choix de la police"
        title="Laquelle vous parle ?"
        display
        lead="Le même contenu, quatre polices de texte. Les titres restent en Instrument Serif : seule la police du texte courant change. Dites-moi simplement le nom de celle que vous préférez."
        actions={
          <Tabs
            options={[
              { value: 'grid', label: 'Comparer' },
              { value: 'solo', label: 'Une par une' },
            ]}
            value={mode}
            onChange={(v) => setMode(v as 'grid' | 'solo')}
            ariaLabel="Mode de comparaison"
          />
        }
      />

      {mode === 'solo' && (
        <div className="chips" style={{ marginBottom: 'var(--s-10)' }}>
          {CANDIDATES.map((c) => (
            <button
              key={c.id}
              type="button"
              className="chip"
              aria-pressed={solo === c.id}
              onClick={() => setSolo(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      {mode === 'grid' ? (
        <div className="tf-grid">
          {CANDIDATES.map((c) => (
            <Sample key={c.id} c={c} />
          ))}
        </div>
      ) : (
        <Sample c={CANDIDATES.find((c) => c.id === solo) ?? CANDIDATES[0]} />
      )}
    </>
  );
}
