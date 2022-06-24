import React from 'react';
import { NoteType } from '../../types';
import { Note } from './Note';
import { useStore } from '../providers/NotesContext';

export function NoteRenderer({notes}) {

  const saveDraft = useStore((state) => state.saveDraft)
  
  return notes.map(note => <Note

    onSaveDraft={(note) => saveDraft(note) }
    note={note} key={note.id}/>)

  //
  // return notes.map(note => {
  //     switch(note.type) {
  //       case NoteType.ANNOTATION: return <div>some annotation</div>
  //       case NoteType.COMMENT: return <div>some comment</div>
  //       default: return  <div>unknown type</div>
  //     }
  //   })
}
