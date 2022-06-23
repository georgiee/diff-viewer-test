import React, { useState } from 'react';
import { Annotation } from '../../types';

interface NoteProps {
  note: Annotation,
  onCancelDraft: Function,
  onSaveDraft: Function,
  onDeleteAnnotation: Function,
  onSaveAnnotation: Function,
}

const DraftAnnotation = ({note, onSaveDraft, onCancelDraft}) => {
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
        <button onClick={() => onSaveDraft({...note, body: message})}>Submit</button>
        <button onClick={() => onCancelDraft(note)}>Cancel</button>
      </div>
    </div>

  )
}

export function Note({ note, onCancelDraft, onSaveDraft, onDeleteAnnotation, onSaveAnnotation }: NoteProps) {
  const [isEdit, setEdit] = useState(false)
  
  const toggleEdit = () => {
    setEdit(!isEdit)
  }
  
  if(note.draft) {
    return <DraftAnnotation 
              note={note} 
              onCancelDraft={onCancelDraft} 
              onSaveDraft={onSaveDraft}/>
  }else {
    const [message, setMessage] = useState(note.body);

    const handleChange = (event) => {
      setMessage(event.target.value);
    };
    
    return (
      <div>
        {
          isEdit ?  <textarea
            value={message} onChange={handleChange}
            placeholder="Provide your comment"/> : note.body 
        }
        
        <hr/>
        {
          isEdit && <button onClick={() => setEdit(false)}>Cancel</button>
        }
        {
          isEdit && <button onClick={() => onDeleteAnnotation(note)}>Delete</button>
        }
        {
          !isEdit && <button onClick={() => setEdit(true)}>Edit</button>
        }
        {
          isEdit && <button onClick={() => {
            onSaveAnnotation({
              ...note,
              body: message
            })
          
            setEdit(false)
          }
          }>Save</button>
        }
    </div>
    )
  }
}
