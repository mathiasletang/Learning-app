import { useEffect, useMemo, useRef, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import type { Note } from '@/core/types';
import { renderMarkdown } from '@/core/markdown';
import { saveNote, deleteNote } from '@/app/actions';
import { SUBJECTS, subjectLabel } from '@/core/meta';
import { Button, Icon } from '@/ui';
import './notes.css';

interface Props {
  /** Sujets visibles dans ce panneau (les notes des autres matières restent chez elles). */
  subjects: string[];
  defaultSubject: string;
}

/**
 * Le carnet de la matière : Markdown et LaTeX, aperçu à droite, enregistrement
 * continu. Chaque matière voit ses notes ; le sujet est prérempli.
 */
export function NotesPanel({ subjects, defaultSubject }: Props) {
  const all = useLiveQuery(() => db.notes.orderBy('updatedAt').reverse().toArray(), [], []);
  const notes = useMemo(() => all.filter((n) => subjects.includes(n.subject)), [all, subjects]);
  const [current, setCurrent] = useState<Note | null>(null);
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const draft = (): Note => ({
    id: `note:${Date.now()}`,
    title: '',
    body: '',
    subject: defaultSubject,
    updatedAt: new Date().toISOString(),
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter((n) => n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q));
  }, [notes, query]);

  const preview = useMemo(() => (current ? renderMarkdown(current.body) : ''), [current]);

  useEffect(() => {
    if (!current) return;
    if (!current.title.trim() && !current.body.trim()) return;
    setSaved(false);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      await saveNote({ ...current, updatedAt: new Date().toISOString() });
      setSaved(true);
    }, 600);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [current]);

  const patch = (p: Partial<Note>) => setCurrent((n) => (n ? { ...n, ...p } : n));
  const options = SUBJECTS.filter((s) => subjects.includes(s.id));

  return (
    <div className="notes">
      <aside className="notes__aside" aria-label="Mes notes">
        <Button variant="primary" icon="plus" block onClick={() => setCurrent(draft())}>
          Nouvelle note
        </Button>
        <label className="search" style={{ marginTop: 'var(--s-4)' }}>
          <span className="sr-only">Rechercher une note</span>
          <span className="search__icon">
            <Icon name="search" size={16} />
          </span>
          <input
            className="field"
            placeholder="Rechercher…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>

        {filtered.length === 0 ? (
          <p className="micro" style={{ marginTop: 'var(--s-4)' }}>
            Aucune note.
          </p>
        ) : (
          <div className="notes__list">
            {filtered.map((n) => (
              <button
                key={n.id}
                type="button"
                className={`note-item ${current?.id === n.id ? 'is-active' : ''}`}
                onClick={() => setCurrent(n)}
              >
                <span className="note-item__title">{n.title || 'Sans titre'}</span>
                <span className="micro note-item__meta">
                  {subjectLabel(n.subject)} · {new Date(n.updatedAt).toLocaleDateString('fr-FR')}
                </span>
              </button>
            ))}
          </div>
        )}
      </aside>

      <section>
        {current ? (
          <>
            <input
              className="editor__title"
              placeholder="Titre"
              value={current.title}
              onChange={(e) => patch({ title: e.target.value })}
              aria-label="Titre de la note"
            />
            <div className="editor__bar">
              <select
                className="field"
                style={{ maxWidth: 190 }}
                value={current.subject}
                onChange={(e) => patch({ subject: e.target.value })}
                aria-label="Matière"
              >
                {options.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
              <span className="micro">{saved ? 'Enregistré' : 'Enregistrement…'}</span>
              <span className="spacer" />
              <Button
                variant="ghost"
                icon="trash"
                aria-label="Supprimer la note"
                onClick={async () => {
                  await deleteNote(current.id);
                  setCurrent(null);
                }}
              />
            </div>

            <div className="editor__panes">
              <div>
                <p className="eyebrow" style={{ marginBottom: 'var(--s-4)' }}>
                  Écriture
                </p>
                <textarea
                  className="editor__write"
                  value={current.body}
                  onChange={(e) => patch({ body: e.target.value })}
                  placeholder={'## Idée\n\nUne formule : $\\nabla f(x^\\star) = 0$'}
                  aria-label="Corps de la note"
                />
              </div>
              <div className="editor__preview">
                <p className="eyebrow" style={{ marginBottom: 'var(--s-4)' }}>
                  Aperçu
                </p>
                <div className="prose prose--compact" dangerouslySetInnerHTML={{ __html: preview }} />
              </div>
            </div>
          </>
        ) : (
          <div className="empty">
            <h3>Rien d'ouvert</h3>
            <p className="meta">Choisissez une note à gauche, ou commencez-en une nouvelle.</p>
          </div>
        )}
      </section>
    </div>
  );
}
