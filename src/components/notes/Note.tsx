import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import styled, { css } from 'styled-components';
import { Message } from './components/Message';
import { Meta } from './components/Meta';
import { NoteType } from '../../types';

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

const ActionContainer = styled.div`
  margin-top: 10px;
`

const ActionBarView = ({onEdit, onDelete}) => {
  return (
    <ButtonGroup size={"sm"}>
      <Button variant={"primary"} onClick={onEdit}>
        Edit
      </Button>
      <Button variant={"danger"} onClick={onDelete}>Delete</Button>
    </ButtonGroup>
  )
}

export const NoteContainer = styled.div`
  background-color: #cecece;
  padding: 20px;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 10px;
  ${({noteType}) => noteType == NoteType.COMMENT && css`background: #FFDB58`}
  ${({noteType}) => noteType == NoteType.ANNOTATION && css`background: #85b9ff`}
`

export function Note({note, onSave, onEditNote, onDeleteNote, onCancel}) {
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
      
      <ActionContainer>
        {/* Actions while viewing*/}
        {
          !editing && <ActionBarView onEdit={onEditNote} onDelete={onDeleteNote}/>
        }
      
        {/* Actions while edit a note */}
        {
          editing && !note.draft && (
            <ActionBarSave onSave={() => onSave(createNoteCopy())}  onCancel={onCancel}/>
          )
        }

        {/* Action to save draft*/}
        {note.draft && (
          <ActionBarSave onSave={() => onSave(createNoteCopy())}  onCancel={onCancel}/>
        )}
      </ActionContainer>
    </NoteContainer>
  )
}
