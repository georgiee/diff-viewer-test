import React, { Fragment, useEffect, useMemo } from 'react';
import { locatorEqual } from '../utils/utils';
import { Note } from '../types';
import { NoteComponentInterface } from '../diff-viewer/shared';
import { useDiff } from '../diff-viewer/DiffContext';
import { useAnnotations } from './hooks/useAnnotations';
import { NoteComponent } from './NoteComponent';
import { useAnnotationDrafts } from './stores/note-drafts';
import { MetaComponent } from './MetaComponent';

export function AnnotationNote(data: NoteComponentInterface) {
  const {diffId} = useDiff();
  
  const {annotationsQuery, updateAnnotation, deleteAnnotation, newAnnotation, setQuestions  } = useAnnotations(diffId)
  
  const drafts = useAnnotationDrafts(state => state.drafts);
  const draftMutations = useAnnotationDrafts(state => state.mutations);
  
  useEffect(() => {
    data.addDraftFnRef.current = (locator) => draftMutations.addDraft(locator)
  }, []);
  
  const notes = drafts.concat(annotationsQuery.data ?? [])
  const matchingNotes = useMemo(() => notes.filter(note => locatorEqual(note.locator, data.locator)) || [], [annotationsQuery.data, drafts]);

  const saveQuestions = (noteId, questionIds) => {
    setQuestions.mutate({id: noteId, questions: questionIds})
  }
  
  return matchingNotes.map((note: Note) => {
    return (
      <Fragment key={note.id}>
        <NoteComponent
          note={note}
          onCancel={() => {draftMutations.removeDraft(note)}}
          onSave={(newNote: Note) => {
            if(newNote.draft) {
              newAnnotation.mutate({ body: newNote.body, locator: newNote.locator },  {
                onSuccess: () => draftMutations.removeDraft(newNote)
              })
            }else {
              updateAnnotation.mutate({ id: newNote.id, note: newNote })
            }
          }}
          onDelete={() => deleteAnnotation.mutate({ id: note.id })}/>
          <MetaComponent
            questions={note.questions}
            saveQuestionsCallback={(questionIds) => saveQuestions(note.id, questionIds)}/>
      </Fragment>
    )
  })
}
