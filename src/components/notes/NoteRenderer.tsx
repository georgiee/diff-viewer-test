import React, { useMemo } from 'react';
import { DiffMode, NoteType } from '../../types';
import { useStore } from '../providers/NotesContext';
import { locatorEqual } from '../utils';
import { NoteBase, SimpleNoteViewer } from './Blame';
import { Note } from './Note';

export function NoteRenderer({locator}) {
  const notes = useStore((state: any) => state.notes)
  const mode = useStore((state: any) => state.mode)
  const addDraft = useStore((state: any) => state.createDraft)

  const matchingNotes = useMemo(() => notes.filter(note => locatorEqual(note.locator, locator)), [notes]);
  
  const saveDraft = useStore((state: any) => state.saveDraft)
  const cancelDraft = useStore((state: any) => state.cancelDraft)
  const updateNote = useStore((state: any) => state.updateNote)
  const editNote = useStore((state: any) => state.editNote)
  const deleteNote = useStore((state: any) => state.deleteNote)
  const cancelEdit = useStore((state: any) => state.cancelEdit)
  
  // only view things
  if(mode == DiffMode.INTERVIEW) {
    return matchingNotes.map(note => {
      if(note.type == NoteType.ANNOTATION) {
        return <SimpleNoteViewer key={note.id} note={note}/>
      }else {
        return <SimpleNoteViewer key={note.id} note={note}/>
        // return <Note onSaveDraft={(note) => saveDraft(note) } note={note} key={note.id}/>
      }
    })
  }else {
    return matchingNotes.map(note => {
        return (
          <NoteBase
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
  
  
  

  //
  // return notes.map(note => {
  //     switch(note.type) {
  //       case NoteType.ANNOTATION: return <div>some annotation</div>
  //       case NoteType.COMMENT: return <div>some comment</div>
  //       default: return  <div>unknown type</div>
  //     }
  //   })
}
