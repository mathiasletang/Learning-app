import { useRef, useState } from 'react';
import { exportAll, importAll, resetAll, type ExportBundle } from '@/core/db';
import { toDayStr } from '@/core/date';
import { useApp } from '@/app/store';
import { Button, Card, Modal, Icon } from '@/ui';

export function DataZone() {
  const pushToast = useApp((s) => s.pushToast);
  const reload = useApp((s) => s.reloadFromDb);
  const refreshBadges = useApp((s) => s.refreshBadges);
  const fileRef = useRef<HTMLInputElement>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  async function doExport() {
    const bundle = await exportAll();
    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cours-avances-sauvegarde-${toDayStr()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    pushToast({ title: 'Sauvegarde exportée', icon: '💾', kind: 'success' });
  }

  async function doImport(file: File) {
    try {
      const text = await file.text();
      const bundle = JSON.parse(text) as ExportBundle;
      await importAll(bundle, 'replace');
      await reload();
      await refreshBadges();
      pushToast({ title: 'Progression importée', icon: '📥', kind: 'success' });
    } catch (e) {
      pushToast({
        title: 'Import impossible',
        desc: e instanceof Error ? e.message : 'Fichier invalide.',
        icon: '⚠️',
      });
    }
  }

  async function doReset() {
    await resetAll();
    await reload();
    setConfirmReset(false);
    pushToast({ title: 'Progression réinitialisée', icon: '🧹' });
  }

  return (
    <Card pad="lg">
      <div className="section-title">Données — sauvegarde et portabilité</div>
      <p className="meta" style={{ marginBottom: 'var(--s-4)' }}>
        Tes données vivent sur cet appareil. Exporte régulièrement : c'est ton filet de sécurité et
        le moyen de passer d'un appareil à l'autre.
      </p>
      <div className="row row--wrap" style={{ gap: 'var(--s-3)' }}>
        <Button variant="primary" icon="download" onClick={doExport}>
          Exporter (JSON)
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
        <Button variant="danger" icon="trash" onClick={() => setConfirmReset(true)}>
          Réinitialiser
        </Button>
      </div>

      <Modal
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        title="Tout réinitialiser ?"
        footer={
          <>
            <span className="spacer" />
            <Button variant="ghost" onClick={() => setConfirmReset(false)}>
              Annuler
            </Button>
            <Button variant="danger" onClick={doReset}>
              Réinitialiser
            </Button>
          </>
        }
      >
        <p className="row" style={{ gap: 'var(--s-3)', alignItems: 'flex-start' }}>
          <Icon name="trash" size={22} />
          <span>
            Cette action efface toute ta progression (XP, révisions, notes, temps…) sur cet
            appareil. Le contenu (cours, QCM) n'est pas touché. Pense à exporter avant.
          </span>
        </p>
      </Modal>
    </Card>
  );
}
