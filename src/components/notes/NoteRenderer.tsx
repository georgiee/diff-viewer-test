import React, { useEffect, useMemo } from 'react';
import { DiffMode } from '../../types';
import { useStore } from '../providers/NotesContext';
import { locatorEqual } from '../utils';
import { Note, SimpleNoteViewer } from './Note';

/**
 * The wiring component to connect our note with the store
 * and pick the correct note component variant.
 */

export function NoteRenderer({locator, addDraftFnRef}) {
  const notes = useStore((state: any) => state.notes)
  const mode = useStore((state: any) => state.mode)

  const matchingNotes = useMemo(() => notes.filter(note => locatorEqual(note.locator, locator)), [notes]);
  
  const addDraft = useStore((state: any) => state.createDraft)
  
  useEffect(() => {
    addDraftFnRef.current = addDraft
  }, []);
  
  const cancelNote = useStore((state: any) => state.cancel)
  const cancelDraft = useStore((state: any) => state.cancelDraft)
  const saveNote = useStore((state: any) => state.update)
  const createNote = useStore((state: any) => state.create)
  const deleteNote = useStore((state: any) => state.deleteNote)

  const editNote = useStore((state: any) => state.editNote)
  
  // only view things
  if(mode == DiffMode.INTERVIEW) {
    return matchingNotes.map(note => <SimpleNoteViewer key={note.id} note={note}/>)
  }else {
    return matchingNotes.map(note => {
        return (
          <Note
            note={note} key={note.id}
            onEditNote={() => editNote(note.id) }
            onCancelEdit={() => cancelNote(note.id) }
            onDeleteNote={() => deleteNote(note.id) }
            onUpdateNote={(updatedNote) => saveNote(updatedNote) }
            onSaveDraft={(newNote) => createNote(newNote) }
            onCancelDraft={() => cancelDraft(note.id) }/>
        )
    })
  }
}
