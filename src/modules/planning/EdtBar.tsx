import { useRef, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import { ageSynchro, EDT_SOURCE } from '@/core/edt';
import { importerEdt, syncEdt } from '@/app/actions';
import { useApp } from '@/app/store';
import { Icon } from '@/ui';
import { useNow } from './shared';

/**
 * L'état de l'emploi du temps, en une ligne au-dessus du planning.
 *
 * Une ligne, et pas une page de réglages : la seule question qu'on se pose
 * devant un cours affiché est « est-ce à jour ? ». La réponse doit être là,
 * et de quoi la corriger juste à côté.
 *
 * Deux voies, dans cet ordre d'importance. **Importer un fichier** ne dépend
 * de rien — ni du serveur d'ADE, ni d'un relais, ni d'une connexion — et
 * c'est pourquoi le bouton reste toujours offert. **Actualiser** relit le
 * flux, quand le relais du site veut bien répondre ; sa panne se dit, mais
 * n'efface rien.
 */
export function EdtBar() {
  const now = useNow();
  const syncedAt = useApp((s) => s.prefs.edtSyncedAt);
  const erreur = useApp((s) => s.prefs.edtSyncError);
  const origine = useApp((s) => s.prefs.edtOrigine);
  const cours = useLiveQuery(() => db.edt.count(), [], null);
  const [enCours, setEnCours] = useState<'lecture' | 'import' | null>(null);
  const champ = useRef<HTMLInputElement>(null);

  if (cours === null) return null;

  const age = ageSynchro(syncedAt, now.ms);
  const vide = cours === 0;

  async function actualiser() {
    setEnCours('lecture');
    try {
      await syncEdt(true);
    } finally {
      setEnCours(null);
    }
  }

  async function importer(fichier: File | undefined) {
    if (!fichier) return;
    setEnCours('import');
    try {
      await importerEdt(fichier);
    } finally {
      setEnCours(null);
      // Sans cela, réimporter le même fichier ne déclencherait rien.
      if (champ.current) champ.current.value = '';
    }
  }

  return (
    <div className="plan__edt" data-erreur={(!!erreur && vide) || undefined}>
      <p className="micro plan__edttexte">
        <Icon name="school" size={14} />
        <span>
          Emploi du temps {EDT_SOURCE}
          {vide ? (
            <> — aucun cours pour l'instant</>
          ) : (
            <>
              <span aria-hidden> · </span>
              <span className="tnum">{cours}</span> cours
              {age && (
                <>
                  <span aria-hidden> · </span>
                  {origine === 'fichier' ? `importé ${age}` : `lu ${age}`}
                </>
              )}
            </>
          )}
        </span>
      </p>

      {/* L'échec de la lecture réseau prend sa propre ligne : accolé au reste,
          il se lisait comme la suite de la phrase. */}
      {erreur && <p className="micro plan__edterr">Lecture réseau : {erreur}</p>}

      <span className="plan__edtactions">
        {/* Un `input[type=file]` ne se met pas en forme : c'est l'étiquette qui
            porte le bouton, et le champ vit caché derrière elle. */}
        <label className="btn btn--secondary plan__import">
          <input
            ref={champ}
            type="file"
            accept=".ics,text/calendar"
            className="sr-only"
            onChange={(e) => importer(e.target.files?.[0])}
            disabled={enCours !== null}
          />
          <Icon name="upload" size={15} />
          {enCours === 'import' ? 'Lecture…' : vide ? 'Importer un .ics' : 'Remplacer'}
        </label>

        <button
          type="button"
          className="btn btn--ghost"
          onClick={actualiser}
          disabled={enCours !== null}
        >
          {enCours === 'lecture' ? 'Lecture…' : 'Actualiser'}
        </button>
      </span>
    </div>
  );
}
