import React, { useState } from 'react';
import { Annotation } from '../../types';

interface NoteProps {
  note: Annotation,
  onCancelDraft: Function,
  onSaveDraft: Function
}

export function Note({ note, onCancelDraft, onSaveDraft }: NoteProps) {
  
  if(note.draft) {
    const [message, setMessage] = useState(note.body);

    const handleChange = (event) => {
      setMessage(event.target.value);
    };
    
    return (
      <div >
          <textarea 
            value={message} onChange={handleChange}
            placeholder="Provide your comment"/>
        
          <div>
          <small>💡 press <code>ctrl + enter</code> to save, <code>ESC</code> to cancel</small>
      </div>
      
        <hr/>

      <div>
        <button onClick={() => onSaveDraft()}>Submit</button>
        <button onClick={() => onCancelDraft()}>Cancel</button>
      </div>
  </div>

  )
  }else {
    return (
      <div>{note.body}</div>
    )
  }
}
