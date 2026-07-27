import { useRef, useState } from 'react';
import { exportAll, importAll, resetAll, type ExportBundle } from '@/core/db';
import { toDayStr } from '@/core/date';
import { useApp } from '@/app/store';
import { Button, Modal } from '@/ui';

export function DataZone() {
  const pushToast = useApp((s) => s.pushToast);
  const reload = useApp((s) => s.reloadFromDb);
  const refreshBadges = useApp((s) => s.refreshBadges);
  const fileRef = useRef<HTMLInputElement>(null);
  const [confirm, setConfirm] = useState(false);

  async function doExport() {
    const bundle = await exportAll();
    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cours-avances-sauvegarde-${toDayStr()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    pushToast({ title: 'Sauvegarde exportée' });
  }

  async function doImport(file: File) {
    try {
      const bundle = JSON.parse(await file.text()) as ExportBundle;
      await importAll(bundle, 'replace');
      await reload();
      await refreshBadges();
      pushToast({ title: 'Progression importée' });
    } catch (e) {
      pushToast({
        title: 'Import impossible',
        desc: e instanceof Error ? e.message : 'Fichier invalide.',
      });
    }
  }

  async function doReset() {
    await resetAll();
    await reload();
    setConfirm(false);
    pushToast({ title: 'Progression réinitialisée' });
  }

  return (
    <>
      <div className="section__head">
        <h2>Vos données</h2>
        <span className="micro">Sur cet appareil</span>
      </div>

      <p className="lead" style={{ marginBottom: 'var(--s-8)' }}>
        Rien ne quitte votre navigateur. Exportez de temps en temps : c'est votre filet de sécurité,
        et le moyen de passer d'un appareil à l'autre.
      </p>

      <div className="row row--wrap" style={{ gap: 'var(--s-3)' }}>
        <Button variant="primary" icon="download" onClick={doExport}>
          Exporter
        </Button>
        <Button variant="secondary" icon="upload" onClick={() => fileRef.current?.click()}>
          Importer
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) doImport(f);
            e.target.value = '';
          }}
        />
        <span className="spacer" />
        <Button variant="danger" icon="trash" onClick={() => setConfirm(true)}>
          Réinitialiser
        </Button>
      </div>

      <Modal
        open={confirm}
        onClose={() => setConfirm(false)}
        title="Tout effacer ?"
        footer={
          <>
            <span className="spacer" />
            <Button variant="ghost" onClick={() => setConfirm(false)}>
              Annuler
            </Button>
            <Button variant="danger" onClick={doReset}>
              Effacer
            </Button>
          </>
        }
      >
        <p className="meta">
          Cette action supprime toute votre progression sur cet appareil : expérience, révisions,
          notes, temps. Le contenu (cours, questions, vocabulaire) reste intact. Pensez à exporter
          avant.
        </p>
      </Modal>
    </>
  );
}
