import React, { useState } from 'react';
import { Message } from '../components/notes/components/Message';
import { Button, ButtonGroup } from 'react-bootstrap';

export const NoteComponent = ({note, onSave, onDelete, onCancel}) => {
  const [editing, setEdit] = useState(note.draft)
  const [message, setMessage] = useState(note.body);

  const toggleEdit = (value:boolean | null = null) => {
    if(value != null) {
      setEdit(value)
    }else {
      setEdit(!editing)
    }
  }

  function saveNote() {
    setEdit(false)

    onSave({
      ...note,
      body: message
    })
  }

  return (
    <div>
      <Message editing={editing} message={message} onChange={(event) => setMessage(event.target.value)}/>

      <div>
        <ButtonGroup size={"sm"}>
          {!editing && <Button variant={"primary"} onClick={() => toggleEdit()}>Edit</Button>}
          {editing && <Button variant={"primary"} onClick={saveNote}>Save</Button>}
          {!editing && <Button variant={"danger"} onClick={onDelete}>Delete</Button>}
          {editing && <Button variant={"secondary"} onClick={() =>{
            toggleEdit(false); onCancel()
          }}>Cancel</Button>}
        </ButtonGroup>
      </div>
    </div>
  )
}
