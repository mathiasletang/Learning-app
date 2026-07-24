import { useEffect, useMemo, useRef, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import type { Note } from '@/core/types';
import { renderMarkdown } from '@/core/markdown';
import { saveNote, deleteNote } from '@/app/actions';
import { SUBJECTS } from '@/core/meta';
import { PageHead } from '@/ui/PageHead';
import { Button, Icon } from '@/ui';
import './notes.css';

function newDraft(): Note {
  return {
    id: `note:${Date.now()}`,
    title: '',
    body: '',
    subject: 'gen',
    updatedAt: new Date().toISOString(),
  };
}

export function Notes() {
  const notes = useLiveQuery(() => db.notes.orderBy('updatedAt').reverse().toArray(), [], []);
  const [draft, setDraft] = useState<Note | null>(null);
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) => n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q),
    );
  }, [notes, query]);

  const preview = useMemo(() => (draft ? renderMarkdown(draft.body) : ''), [draft]);

  // Sauvegarde automatique (débounce), seulement si la note a du contenu.
  useEffect(() => {
    if (!draft) return;
    if (!draft.title.trim() && !draft.body.trim()) return;
    setSaved(false);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      await saveNote({ ...draft, updatedAt: new Date().toISOString() });
      setSaved(true);
    }, 600);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [draft]);

  function patch(p: Partial<Note>) {
    setDraft((d) => (d ? { ...d, ...p } : d));
  }

  async function removeCurrent() {
    if (!draft) return;
    await deleteNote(draft.id);
    setDraft(null);
  }

  return (
    <>
      <PageHead
        title="Notes"
        subtitle="Markdown + LaTeX, aperçu en temps réel, sauvegarde automatique."
        actions={
          <Button variant="primary" icon="plus" onClick={() => setDraft(newDraft())}>
            Nouvelle note
          </Button>
        }
      />

      <div className="notes">
        <aside className="notes__list" aria-label="Liste des notes">
          <span style={{ position: 'relative' }}>
            <Icon name="search" size={16} className="input-icon" />
            <input
              className="input"
              style={{ paddingLeft: 'var(--s-8)' }}
              placeholder="Rechercher…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </span>
          {filtered.length === 0 && <p className="meta">Aucune note.</p>}
          {filtered.map((n) => (
            <button
              key={n.id}
              type="button"
              className={`note-item ${draft?.id === n.id ? 'is-active' : ''}`}
              onClick={() => setDraft(n)}
            >
              <div className="note-item__title">{n.title || 'Sans titre'}</div>
              <div className="note-item__meta">
                {SUBJECTS.find((s) => s.id === n.subject)?.label ?? n.subject} ·{' '}
                {new Date(n.updatedAt).toLocaleDateString('fr-FR')}
              </div>
            </button>
          ))}
        </aside>

        <section>
          {draft ? (
            <>
              <div className="row row--between" style={{ marginBottom: 'var(--s-3)', gap: 'var(--s-3)' }}>
                <input
                  className="input"
                  placeholder="Titre de la note"
                  value={draft.title}
                  onChange={(e) => patch({ title: e.target.value })}
                  style={{ fontWeight: 700 }}
                />
                <select
                  className="select"
                  style={{ maxWidth: 160 }}
                  value={draft.subject}
                  onChange={(e) => patch({ subject: e.target.value })}
                  aria-label="Matière"
                >
                  {SUBJECTS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <Button variant="ghost" icon="trash" aria-label="Supprimer la note" onClick={removeCurrent} />
              </div>
              <div className="editor">
                <div className="editor__pane">
                  <label className="section-title" htmlFor="note-body">
                    Éditeur
                  </label>
                  <textarea
                    id="note-body"
                    className="textarea editor__textarea"
                    value={draft.body}
                    onChange={(e) => patch({ body: e.target.value })}
                    placeholder={'# Titre\n\nÉcris en Markdown. Formule : $e^{i\\pi}+1=0$'}
                  />
                </div>
                <div className="editor__pane">
                  <div className="section-title">Aperçu</div>
                  <div className="editor__preview prose" dangerouslySetInnerHTML={{ __html: preview }} />
                </div>
              </div>
              <p className="save-hint" style={{ marginTop: 'var(--s-2)' }}>
                {saved ? '✓ Enregistré' : 'Enregistrement…'}
              </p>
            </>
          ) : (
            <div className="empty">
              <div className="empty__icon">📝</div>
              <p>Sélectionne une note ou crée-en une nouvelle.</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
