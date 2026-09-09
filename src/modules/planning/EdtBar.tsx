import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import { ageSynchro, EDT_SOURCE } from '@/core/edt';
import { syncEdt } from '@/app/actions';
import { useApp } from '@/app/store';
import { Icon } from '@/ui';
import { useNow } from './shared';

/**
 * L'état de l'emploi du temps, en une ligne au-dessus du planning.
 *
 * Une ligne, et pas une page de réglages : la seule question qu'on se pose
 * devant un cours affiché est « est-ce à jour ? ». La réponse doit être là,
 * et le bouton pour la corriger juste à côté. Un échec se dit — sans quoi on
 * lirait l'emploi du temps de la semaine dernière sans le savoir.
 */
export function EdtBar() {
  const now = useNow();
  const syncedAt = useApp((s) => s.prefs.edtSyncedAt);
  const erreur = useApp((s) => s.prefs.edtSyncError);
  const cours = useLiveQuery(() => db.edt.count(), [], null);
  const [enCours, setEnCours] = useState(false);

  if (cours === null) return null;

  const age = ageSynchro(syncedAt, now.ms);
  const jamais = !syncedAt && cours === 0;

  async function actualiser() {
    setEnCours(true);
    try {
      await syncEdt(true);
    } finally {
      setEnCours(false);
    }
  }

  return (
    <p className="micro plan__edt" data-erreur={!!erreur || undefined}>
      <Icon name="school" size={14} />
      <span>
        Emploi du temps {EDT_SOURCE}
        {!jamais && (
          <>
            <span aria-hidden> · </span>
            <span className="tnum">{cours}</span> cours
          </>
        )}
        {age && (
          <>
            <span aria-hidden> · </span>
            {`lu ${age}`}
          </>
        )}
      </span>
      {erreur && <span className="plan__edterr">lecture impossible — {erreur}</span>}
      <span className="spacer" />
      <button type="button" className="btn btn--ghost" onClick={actualiser} disabled={enCours}>
        {enCours ? 'Lecture…' : 'Actualiser'}
      </button>
    </p>
  );
}
