import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import { cardInSubject, SUBJECT_DEFS, type SubjectId } from '@/core/subjects';
import type { Flashcard } from '@/core/types';
import { Button, Icon, PageHead } from '@/ui';
import {
  clearSession,
  loadSession,
  newSession,
  saveSession,
  shuffleIds,
  tally,
  type CardsSession,
  type CardVerdict,
} from './cards-session';
import './cards.css';

/**
 * Le mode Cartes : parcourir un paquet en entier, recto puis verso, en
 * marquant chaque carte « connue » ou « à revoir ».
 *
 * C'est le pendant de la révision espacée, pas son remplacement : ici rien
 * n'est planifié, rien n'est écrit en base. On lit db.flashcards, un point
 * c'est tout — l'échéance, l'intervalle et la facilité des cartes sortent
 * d'une séance de Cartes exactement comme elles y sont entrées.
 */
export function Cards() {
  const { deck = '' } = useParams();
  const valid = deck in SUBJECT_DEFS;
  const def = valid ? SUBJECT_DEFS[deck as SubjectId] : null;

  const allCards = useLiveQuery(() => db.flashcards.toArray(), [], null);
  const cards = useMemo<Flashcard[] | null>(
    () => (allCards && def ? allCards.filter((c) => cardInSubject(c, def.id)) : null),
    [allCards, def],
  );

  const [session, setSession] = useState<CardsSession | null>(null);
  const [flipped, setFlipped] = useState(false);

  /* Première ouverture : on reprend la session du paquet si elle tient
     toujours debout, sinon on en ouvre une neuve dans l'ordre du paquet. */
  useEffect(() => {
    if (!cards?.length || session) return;
    const ids = cards.map((c) => c.id);
    setSession(loadSession(deck, ids) ?? newSession(deck, ids));
  }, [cards, session, deck]);

  useEffect(() => {
    if (session) saveSession(session);
  }, [session]);

  const byId = useMemo(() => new Map((cards ?? []).map((c) => [c.id, c])), [cards]);
  const current = session ? byId.get(session.order[session.index] ?? '') : undefined;
  const counts = session ? tally(session) : { known: 0, again: 0 };

  /** Classer la carte courante et avancer. Le verdict ne quitte pas la session. */
  const classify = useCallback((verdict: CardVerdict) => {
    setSession((s) => {
      if (!s || s.index >= s.order.length) return s;
      return {
        ...s,
        verdicts: { ...s.verdicts, [s.order[s.index]]: verdict },
        index: s.index + 1,
      };
    });
    setFlipped(false);
  }, []);

  /** Revenir d'une carte et annuler son classement. */
  const back = useCallback(() => {
    setSession((s) => {
      if (!s || s.index === 0) return s;
      const verdicts = { ...s.verdicts };
      delete verdicts[s.order[s.index - 1]];
      return { ...s, verdicts, index: s.index - 1 };
    });
    setFlipped(false);
  }, []);

  const shuffle = useCallback(() => {
    setSession((s) => (s ? { ...s, order: shuffleIds(s.order), index: 0, verdicts: {} } : s));
    setFlipped(false);
  }, []);

  /** Reprendre le paquet entier, dans l'ordre courant. */
  const restart = useCallback(() => {
    setSession((s) => (s ? { ...s, index: 0, verdicts: {}, round: 0 } : s));
    setFlipped(false);
  }, []);

  /** Ne garder que les cartes à revoir — la seconde manche. */
  const replayAgain = useCallback(() => {
    setSession((s) => {
      if (!s) return s;
      const order = s.order.filter((id) => s.verdicts[id] === 'again');
      return order.length ? { ...s, order, index: 0, verdicts: {}, round: s.round + 1 } : s;
    });
    setFlipped(false);
  }, []);

  const finished = !!session && session.index >= session.order.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e.target)) return;
      if (finished) return;
      if (e.key === ' ' || e.key === 'Enter') {
        /* La carte, les boutons et les liens gèrent déjà ces deux touches :
           les traiter ici aussi retournerait la carte une seconde fois. */
        if (handlesOwnKeys(e.target)) return;
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        classify('known');
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        classify('again');
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        back();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [classify, back, finished]);

  if (!valid || !def) return <Navigate to="/" replace />;
  if (cards === null) return <p className="meta">Chargement…</p>;

  /* La page prend la couleur de la matière, comme sa page d'origine. */
  const scope = {
    '--accent': `var(${def.colorVar})`,
    '--accent-wash': `color-mix(in srgb, var(${def.colorVar}) 10%, var(--surface))`,
  } as React.CSSProperties;
  const home = `${def.path}?s=revision`;

  if (cards.length === 0) {
    return (
      <div style={scope}>
        <PageHead eyebrow="Cartes" title={def.label} display />
        <div className="empty">
          <h3>Ce paquet est vide</h3>
          <p className="meta">
            Les questions manquées en séance de QCM deviennent des cartes, et l'on peut aussi en
            écrire à la main depuis l'onglet Révision.
          </p>
          <Link to={home} className="btn btn--secondary">
            Aller à la révision
          </Link>
        </div>
      </div>
    );
  }

  if (finished && session) {
    const total = session.order.length;
    return (
      <div style={scope}>
        <PageHead
          eyebrow="Cartes"
          title="Paquet parcouru."
          display
          lead={
            counts.again === 0
              ? `${total} carte${total > 1 ? 's' : ''} revue${total > 1 ? 's' : ''}, aucune à revoir. Rien n'a été replanifié : la révision espacée garde ses échéances.`
              : `${total} carte${total > 1 ? 's' : ''} parcourue${total > 1 ? 's' : ''}. Rien n'a été replanifié : la révision espacée garde ses échéances.`
          }
        />
        <div className="figures">
          <div>
            <span className="figure__value tnum">{counts.known}</span>
            <span className="eyebrow figure__label">Connues</span>
          </div>
          <div>
            <span className="figure__value tnum">{counts.again}</span>
            <span className="eyebrow figure__label">À revoir</span>
          </div>
          <div>
            <span className="figure__value tnum">{total}</span>
            <span className="eyebrow figure__label">Cartes du tour</span>
          </div>
        </div>
        <div className="row row--wrap" style={{ gap: 'var(--s-3)', marginTop: 'var(--s-10)' }}>
          {counts.again > 0 && (
            <Button variant="primary" icon="refresh" onClick={replayAgain}>
              Rejouer {counts.again > 1 ? `les ${counts.again} cartes` : 'la carte'} à revoir
            </Button>
          )}
          <Button variant="secondary" icon="cards" onClick={restart}>
            Tout recommencer
          </Button>
          <Link
            to={home}
            className="btn btn--ghost"
            onClick={() => clearSession(deck)}
          >
            Retour à {def.label}
          </Link>
        </div>
      </div>
    );
  }

  if (!session || !current) return <p className="meta">Chargement…</p>;

  return (
    <div className="cards" style={scope}>
      <header className="cards__bar">
        {/* Quitter en cours de route ne referme pas le paquet : on retrouve sa
            position en revenant. Seule la fin de parcours efface la session. */}
        <Link to={home} className="btn btn--ghost btn--icon" aria-label="Quitter le mode Cartes">
          <Icon name="x" size={17} />
        </Link>
        <span className="eyebrow">
          {def.label}
          {session.round > 0 ? ' · à revoir' : ''}
        </span>
        <span className="spacer" />
        <span className="meta tnum" aria-label={`Carte ${session.index + 1} sur ${session.order.length}`}>
          {session.index + 1} / {session.order.length}
        </span>
      </header>

      <div className="cards__tally">
        {/* Le compteur ne prend sa couleur qu'une fois ouvert : un zéro rouge
            ne veut rien dire. */}
        <span className="meta">
          À revoir{' '}
          <b className="tnum cards__count cards__count--again" data-on={counts.again > 0}>
            {counts.again}
          </b>
        </span>
        <span className="meta">
          Connues{' '}
          <b className="tnum cards__count cards__count--known" data-on={counts.known > 0}>
            {counts.known}
          </b>
        </span>
        {/* Groupées : en 390 px elles passent à la ligne ensemble, pas l'une
            sans l'autre. */}
        <span className="cards__tools">
          <Button variant="ghost" icon="arrowLeft" onClick={back} disabled={session.index === 0}>
            Précédente
          </Button>
          <Button variant="ghost" icon="shuffle" onClick={shuffle}>
            Mélanger
          </Button>
        </span>
      </div>

      <div
        className="cards__scene"
        role="button"
        tabIndex={0}
        aria-label={flipped ? 'Verso affiché — appuyer pour revenir au recto' : 'Appuyer pour retourner la carte'}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
      >
        <div className="cards__flip" data-flipped={flipped} aria-live="polite">
          <div className="cards__face cards__face--front" aria-hidden={flipped}>
            <span className="eyebrow cards__side">Recto</span>
            <div className="cards__text" dangerouslySetInnerHTML={{ __html: current.front }} />
          </div>
          <div className="cards__face cards__face--back" aria-hidden={!flipped}>
            <span className="eyebrow cards__side">Verso</span>
            <div className="cards__text cards__text--back" dangerouslySetInnerHTML={{ __html: current.back }} />
            {current.expl && (
              <div className="cards__expl" dangerouslySetInnerHTML={{ __html: current.expl }} />
            )}
          </div>
        </div>
      </div>

      <div className="cards__actions">
        <button type="button" className="verdict verdict--again" onClick={() => classify('again')}>
          <Icon name="arrowLeft" size={17} />À revoir
        </button>
        <button type="button" className="verdict verdict--known" onClick={() => classify('known')}>
          Connue
          <Icon name="arrowRight" size={17} />
        </button>
      </div>

      <p className="micro cards__keys">
        Espace retourne · flèche gauche à revoir · flèche droite connue · retour arrière annule
      </p>
    </div>
  );
}

/** Les raccourcis ne doivent pas voler les touches d'un champ de saisie. */
function isTyping(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el || !el.tagName) return false;
  const tag = el.tagName.toLowerCase();
  return tag === 'input' || tag === 'textarea' || tag === 'select' || el.isContentEditable;
}

/** Une commande qui répond nativement à Entrée et Espace. */
function handlesOwnKeys(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  return !!el?.closest?.('button, a, [role="button"]');
}
