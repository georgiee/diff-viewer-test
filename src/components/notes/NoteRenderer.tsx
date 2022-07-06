import React, { useEffect, useMemo } from 'react';
import { DiffMode } from '../../types';
import { useStore } from '../providers/NotesContext';
import { locatorEqual } from '../../utils/utils';
import { Note, SimpleNoteViewer } from './Note';

/**
 * The wiring component to connect our note with the store
 * and pick the correct note component variant.
 */

export function NoteRenderer({locator, addDraftFnRef}) {
  const notes = useStore((state) => state.notes)
  const mode = useStore((state) => state.mode)

  const matchingNotes = useMemo(() => notes.filter(note => locatorEqual(note.locator, locator)), [notes]);
  const mutations = useStore((state) => state.mutations)

  useEffect(() => {
    addDraftFnRef.current = mutations.addDraft
  }, []);
  
  // only view things
  if(mode == DiffMode.INTERVIEW) {
    return matchingNotes.map(note => <SimpleNoteViewer key={note.id} note={note}/>)
  }else {
    return matchingNotes.map(note => {
        return (
          <Note
            note={note} key={note.id}
            onEditNote={() => mutations.edit(note.id) }
            onCancel={() => mutations.cancel(note.id) }
            onDeleteNote={() => mutations.delete(note.id) }
            onSave={(newNote) => {
              if(newNote.draft) {
                mutations.create(newNote)
              }else {
                mutations.update(newNote)
              }
            }}/>
        )
    })
  }
}
