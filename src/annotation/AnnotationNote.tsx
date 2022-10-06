import React, { useEffect, useMemo } from 'react';
import { locatorEqual } from '../utils/utils';
import { Note } from '../types';
import { NoteComponentInterface } from '../diff-viewer/shared';
import { useDiff } from '../diff-viewer/DiffContext';
import { useAnnotations } from './hooks/useAnnotations';
import { NoteComponent } from './NoteComponent';
import { useAnnotationDrafts } from './store';

export function AnnotationNote(data: NoteComponentInterface) {
  const {diffId} = useDiff();
  
  const {annotationsQuery, updateAnnotation, deleteAnnotation, newAnnotation} = useAnnotations(diffId)
  
  const drafts = useAnnotationDrafts(state => state.drafts);
  const draftMutations = useAnnotationDrafts(state => state.mutations);
  
  useEffect(() => {
    data.addDraftFnRef.current = (locator) => draftMutations.addDraft(locator)
  }, []);
  
  const notes = drafts.concat(annotationsQuery.data ?? [])
  const matchingNotes = useMemo(() => notes.filter(note => locatorEqual(note.locator, data.locator)) || [], [annotationsQuery.data, drafts]);

  return matchingNotes.map((note: Note) => {
    return (
      <NoteComponent
        key={note.id}
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
    )
  })
}
