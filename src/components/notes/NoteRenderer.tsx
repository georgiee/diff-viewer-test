import React, { useMemo } from 'react';
import { DiffMode, NoteType } from '../../types';
import { useStore } from '../providers/NotesContext';
import { locatorEqual } from '../utils';
import { Note, SimpleNoteViewer } from './Note';

export function NoteRenderer({locator}) {
  const notes = useStore((state: any) => state.notes)
  const mode = useStore((state: any) => state.mode)

  const matchingNotes = useMemo(() => notes.filter(note => locatorEqual(note.locator, locator)), [notes]);
  
  const saveDraft = useStore((state: any) => state.saveDraft)
  const cancelDraft = useStore((state: any) => state.cancelDraft)
  const updateNote = useStore((state: any) => state.updateNote)
  const editNote = useStore((state: any) => state.editNote)
  const deleteNote = useStore((state: any) => state.deleteNote)
  const cancelEdit = useStore((state: any) => state.cancelEdit)
  
  // only view things
  if(mode == DiffMode.INTERVIEW) {
    return matchingNotes.map(note => <SimpleNoteViewer key={note.id} note={note}/>)
  }else {
    return matchingNotes.map(note => {
        return (
          <Note
            note={note} key={note.id}
            onEditNote={() => editNote(note.id) }
            onCancelEdit={() => cancelEdit(note.id) }
            onDeleteNote={() => deleteNote(note.id) }
            onUpdateNote={(updatedNote) => updateNote(updatedNote) }
            onSaveDraft={(newNote) => saveDraft(newNote) }
            onCancelDraft={() => cancelDraft(note) }/>
        )
    })
  }
}
