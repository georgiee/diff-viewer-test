import React, { useEffect, useRef, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Meta, NoteContainer } from './base';

/**
 * Display both comments and annotations without any interactions
 */
export function SimpleNoteViewer({note}) {
  return (
    <NoteContainer noteType={note.type}>
      <Meta note={note}/>
      {note.body}
    </NoteContainer>
  )
}

const ActionBarSave = ({onSave, onCancel}) => {
  return (
    <ButtonGroup size={"sm"}>
      <Button onClick={onSave}>Save</Button>
      <Button variant={"secondary"} onClick={onCancel}>Cancel</Button>
    </ButtonGroup>
  )
}

const Message = ({editing, message, onChange}) => {
  const textareaElement = useRef<HTMLTextAreaElement>(null);

  // autofocus the textarea when editing and place the cursor at the end of any given text
  useEffect(() => {
    if (editing && textareaElement.current) {
      textareaElement.current.focus()
      textareaElement.current.setSelectionRange(message.length, message.length);
    }
  }, [editing])

  
  return (
    <>
      { editing && <textarea ref={textareaElement} className="form-control mb-2" value={message} onChange={onChange} placeholder="Provide your comment"/>}
      { !editing && message}
    </>
  )
}
export function Note({note, onSaveDraft, onCancelDraft, onUpdateNote, onEditNote, onDeleteNote, onCancelEdit}) {
  const [editing, setEdit] = useState(false)
  const [message, setMessage] = useState(note.body);
  

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    setEdit(note.edit || note.draft);
  }, [note.edit, note.draft])

  const createNoteCopy = () => {
    return {
     ...note, body: message
    }
  }

  
  return (
    <NoteContainer noteType={note.type}>
      <Meta note={note}/>
      <Message editing={editing} message={message} onChange={handleChange}/>

      {/* Actions while viewing*/}
      <div>
        {
          !editing && (
            <ButtonGroup size={"sm"}>
              <Button variant={"primary"} onClick={() => onEditNote()}>
                Edit
              </Button>
              <Button variant={"danger"} onClick={() => onDeleteNote()}>Delete</Button>
            </ButtonGroup>
          )
        }
      </div>
      
      {/* Actions while edit a note */}
      {
        editing && !note.draft && (
          <ActionBarSave onSave={() => onUpdateNote(createNoteCopy())}  onCancel={onCancelEdit}/>
        )
      }
      
      {/* Action to save draft*/}
      {note.draft && (
        <ActionBarSave onSave={() => onSaveDraft(createNoteCopy())}  onCancel={onCancelDraft}/>
      )}
        
    </NoteContainer>
  )
}
