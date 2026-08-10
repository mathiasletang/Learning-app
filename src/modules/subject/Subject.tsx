import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/core/db';
import { toDayStr } from '@/core/date';
import {
  SUBJECT_DEFS,
  SECTION_ORDER,
  SECTION_LABEL,
  cardInSubject,
  type SubjectId,
  type SubjectSection,
} from '@/core/subjects';
import { PageHead, Tabs } from '@/ui';
import { SubjectTrack } from './SubjectTrack';
import { SubjectDocs } from './SubjectDocs';
import { SubjectPractice } from './SubjectPractice';
import { SubjectRevision } from './SubjectRevision';
import { NotesPanel } from '@/modules/notes/NotesPanel';
import './subject.css';

/**
 * Une page par matière, un gabarit commun : Parcours (la route), Documents
 * (l'index), S'exercer (les questions), Révision (les erreurs), Notes.
 * Une fonctionnalité, un emplacement — où que l'on soit, le même ordre.
 */
export function Subject({ id }: { id: SubjectId }) {
  const def = SUBJECT_DEFS[id];
  const [params, setParams] = useSearchParams();
  const raw = params.get('s') as SubjectSection | null;
  const section: SubjectSection = raw && SECTION_ORDER.includes(raw) ? raw : 'parcours';

  const today = toDayStr();
  const dueCards = useLiveQuery(
    () => db.flashcards.where('due').belowOrEqual(today).toArray(),
    [today],
    [],
  );
  const due = useMemo(
    () => dueCards.filter((c) => cardInSubject(c, id)).length,
    [dueCards, id],
  );

  const options = SECTION_ORDER.map((s) => ({
    value: s,
    label: s === 'revision' && due > 0 ? `${SECTION_LABEL[s]} · ${due}` : SECTION_LABEL[s],
  }));

  return (
    <>
      <PageHead
        eyebrow="Matière"
        title={def.label}
        display
        lead={def.lead}
        actions={
          <Tabs
            options={options}
            value={section}
            onChange={(s) => setParams(s === 'parcours' ? {} : { s }, { replace: false })}
            ariaLabel={`Sections de ${def.label}`}
          />
        }
      />

      {section === 'parcours' && <SubjectTrack def={def} />}
      {section === 'documents' && <SubjectDocs def={def} />}
      {section === 'exercer' && <SubjectPractice def={def} />}
      {section === 'revision' && <SubjectRevision def={def} />}
      {section === 'notes' && (
        <NotesPanel subjects={def.noteSubjects} defaultSubject={def.noteSubjects[0]} />
      )}
    </>
  );
}
