import React, { useMemo } from 'react';
import { DiffMode, NoteType } from '../../types';
import { useStore } from '../providers/NotesContext';
import { locatorEqual } from '../utils';
import { NoteBase, SimpleNoteViewer } from './Blame';
import { Note } from './Note';

export function NoteRenderer({locator}) {
  const notes = useStore((state) => state.notes)
  const mode = useStore((state) => state.mode)
  const addDraft = useStore((state) => state.createDraft)

  const matchingNotes = useMemo(() => notes.filter(note => locatorEqual(note.locator, locator)), [notes]);
  
  const saveDraft = useStore((state) => state.saveDraft)
  const cancelDraft = useStore((state) => state.cancelDraft)
  const updateNote = useStore((state) => state.updateNote)
  const editNote = useStore((state) => state.editNote)
  
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
