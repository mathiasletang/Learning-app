import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import { toDayStr } from '@/core/date';
import { useApp } from '@/app/store';
import { getParcours } from '@/core/content';
import { WORD_COUNT } from '@/core/lexicon-meta';
import { cardInSubject } from '@/core/subjects';
import { openResource } from '@/app/actions';
import { Icon, Tag, Gauge, Reveal } from '@/ui';
import './dashboard.css';

/** Le cours de référence du niveau L3 — point de départ du travail. */
const CENTRAL_PDF = '00_L3_Toulon_Faccanoni/cours_L3_Faccanoni.pdf';

function greeting(): string {
  const h = new Date().getHours();
  if (h < 5) return 'Bonne nuit';
  if (h < 12) return 'Bonjour';
  if (h < 18) return 'Bon après-midi';
  return 'Bonsoir';
}

function todayLabel(): string {
  return new Date()
    .toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
    .replace(/^\w/, (c) => c.toUpperCase());
}

/** Première étape non faite d'un des parcours donnés. */
function nextStep(tracks: ('opt' | 'fin' | 'cfa')[], done: Set<string>) {
  const parcours = getParcours();
  for (const t of tracks) {
    for (const phase of parcours[t].phases) {
      for (const step of phase.steps) {
        if (!done.has(step.id)) return { phase: phase.t, step: step.t };
      }
    }
  }
  return null;
}

export function Dashboard() {
  const gam = useApp((s) => s.gam);
  const dailyGoal = useApp((s) => s.prefs.dailyGoal);
  const today = toDayStr();

  const dueCards = useLiveQuery(
    () => db.flashcards.where('due').belowOrEqual(today).toArray(),
    [today],
    [],
  );
  const dueVocab = useLiveQuery(
    () => db.vocabSrs.where('due').belowOrEqual(today).count(),
    [today],
    0,
  );
  const doneSteps = useLiveQuery(
    () => db.steps.filter((s) => s.done).toArray().then((r) => new Set(r.map((s) => s.stepId))),
    [],
    new Set<string>(),
  );

  const goalToday = gam.goalDoneDay === today ? gam.goalDoneToday : 0;
  const due = dueCards.length + (dueVocab ?? 0);
  const dueMaths = dueCards.filter((c) => cardInSubject(c, 'maths')).length;
  const dueCfa = dueCards.filter((c) => cardInSubject(c, 'cfa')).length;

  const nextMaths = nextStep(['opt'], doneSteps);
  const nextCfa = nextStep(['fin', 'cfa'], doneSteps);

  return (
    <>
      {/* ---------------------------- Ouverture --------------------------- */}
      <section className="hero">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {todayLabel()}
        </motion.p>
        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          {greeting()}, Mathias.
          <br />
          <em>Reprenons.</em>
        </motion.h1>
      </section>

      {/* ------------------- L'action du jour : réviser -------------------- */}
      <Reveal>
        <div className="today">
          {due > 0 ? (
            <Link to="/reviser" className="today__cta">
              <span>
                <span className="today__label">Réviser</span>
                <span className="meta today__detail">
                  {dueCards.length} carte{dueCards.length > 1 ? 's' : ''} · {dueVocab ?? 0} mot
                  {(dueVocab ?? 0) > 1 ? 's' : ''} — une seule séance
                </span>
              </span>
              <span className="today__count tnum">{due}</span>
              <Icon name="arrowRight" size={20} className="today__arrow" />
            </Link>
          ) : (
            <div className="today__cta today__cta--calm">
              <span>
                <span className="today__label">Mémoire à jour</span>
                <span className="meta today__detail">
                  Rien n'est dû. Les cartes reviendront quand l'oubli approchera.
                </span>
              </span>
              <Icon name="check" size={20} className="today__arrow" />
            </div>
          )}

          <div className="today__goal">
            <span className="micro">Objectif du jour</span>
            <Gauge value={dailyGoal ? Math.min(1, goalToday / dailyGoal) : 0} colorVar="--accent" />
            <span className="micro tnum">
              {goalToday}/{dailyGoal} questions{goalToday >= dailyGoal ? ' · atteint' : ''}
            </span>
          </div>
        </div>
      </Reveal>

      {/* ------------------------- Les trois fronts ------------------------ */}
      <section className="section">
        <div className="section__head">
          <h2>Vos trois fronts</h2>
        </div>

        <div className="fronts">
          <Reveal delay={0.02}>
            <Link to="/anglais" className="tile front">
              <Tag colorVar="--m-cfa">Anglais</Tag>
              <h3 className="front__title">
                {(dueVocab ?? 0) > 0
                  ? `${dueVocab} mot${(dueVocab ?? 0) > 1 ? 's' : ''} à revoir`
                  : 'Apprendre de nouveaux mots'}
              </h3>
              <p className="meta front__note">
                {WORD_COUNT.toLocaleString('fr-FR')} mots, définitions et traductions.
              </p>
              <span className="arrow-link front__go">
                Ouvrir <Icon name="arrowRight" size={15} />
              </span>
            </Link>
          </Reveal>

          <Reveal delay={0.07}>
            <Link to="/maths" className="tile front">
              <Tag colorVar="--m-opt">Maths</Tag>
              <h3 className="front__title">{nextMaths ? nextMaths.step : 'Parcours terminé'}</h3>
              <p className="meta front__note">
                {nextMaths ? nextMaths.phase : 'Consolidez avec les questions.'}
                {dueMaths > 0 ? ` · ${dueMaths} erreur${dueMaths > 1 ? 's' : ''} à revoir` : ''}
              </p>
              <span className="arrow-link front__go">
                Continuer <Icon name="arrowRight" size={15} />
              </span>
            </Link>
          </Reveal>

          <Reveal delay={0.12}>
            <Link to="/cfa" className="tile front">
              <Tag colorVar="--m-fin">CFA · Finance</Tag>
              <h3 className="front__title">{nextCfa ? nextCfa.step : 'Parcours terminé'}</h3>
              <p className="meta front__note">
                {nextCfa ? nextCfa.phase : 'Consolidez avec les questions.'}
                {dueCfa > 0 ? ` · ${dueCfa} erreur${dueCfa > 1 ? 's' : ''} à revoir` : ''}
              </p>
              <span className="arrow-link front__go">
                Continuer <Icon name="arrowRight" size={15} />
              </span>
            </Link>
          </Reveal>
        </div>

        {/* Le cours central, à un geste de l'ouverture. */}
        <Reveal delay={0.16}>
          <button type="button" className="central" onClick={() => openResource(CENTRAL_PDF)}>
            <span className="micro central__tag">Cours central · L3</span>
            <span className="central__name">Faccanoni — Optimisation, 217 pages d'exercices corrigés</span>
            <Icon name="external" size={16} />
          </button>
        </Reveal>
      </section>
    </>
  );
}
