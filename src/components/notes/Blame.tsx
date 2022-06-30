import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { NoteType } from '../../types';
import { formatDate } from '../utils';
import { Button, ButtonGroup } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
const NoteContainer = styled.div`
  background-color: #cecece;
  padding: 20px;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 10px;
  ${({noteType}) => noteType == NoteType.COMMENT && css`background: #FFDB58`}
  ${({noteType}) => noteType == NoteType.ANNOTATION && css`background: #85b9ff`}
`

const AuthorContainer = styled.span`
  font-style: italic;
  font-weight: bold;
`

const Author = ({author}) => {
 return (
   <AuthorContainer>
     {author.name ?? "Unknown"}
   </AuthorContainer>
 )
}

/**
 * Display both comments and annotations without any interactions
 */
export function SimpleNoteViewer({note}) {
  return (
    <NoteContainer noteType={note.type}>
      <Author author={note.author}/>
      {note.body}
    </NoteContainer>
  )
}

const MetaContainer = styled.div`
  margin-bottom: 10px
`
const Meta = ({note}) => {
  if(note.draft) {
    return null;
  }
  
  return (
    <MetaContainer>
      <Author author={note.author}/> wrote on ({formatDate(note.created_at)})
    </MetaContainer>
  )
}

export function NoteBase({note, onSaveDraft, onCancelDraft, onUpdateNote, onEditNote, onDeleteNote, onCancelEdit}) {
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
  const textareaElement = useRef<HTMLTextAreaElement>();
  
  // autofocus the textarea when editing and place the cursor at the end of any given text
  useEffect(() => {
    if (editing && textareaElement.current) {
      textareaElement.current.focus()
      textareaElement.current.setSelectionRange(message.length, message.length);
    }
  }, [editing])

  
  return (
    <NoteContainer noteType={note.type}>
      <Meta note={note}/>
      { editing && <textarea ref={textareaElement} className="form-control mb-2" value={message} onChange={handleChange} placeholder="Provide your comment"/>}
      { !editing && note.body}

      {/* Actions while viewing*/}
      <div>
        {
          !editing && (
            <ButtonGroup size={"sm"}>
              <Button variant={"primary"} onClick={() => onEditNote()}>
                <span><FontAwesomeIcon icon="coffee" /></span>
                Edit
              </Button>
              <Button variant={"danger"} onClick={() => onDeleteNote()}>Delete</Button>
            </ButtonGroup>
          )
        }
      </div>
      
      {/* Actions while edit a note */}
      <div>
        {
          editing && !note.draft && (
            <ButtonGroup size={"sm"}>
              <Button onClick={() => onUpdateNote(createNoteCopy())}>Save</Button>
              <Button variant={"secondary"} onClick={() => onCancelEdit()}>Cancel</Button>
            </ButtonGroup>
          )
        }
      </div>
      
      {/* Action to save draft*/}
      {note.draft && (
        <ButtonGroup size={"sm"}>
          <Button onClick={() => onSaveDraft(createNoteCopy())}>Save</Button>
          <Button variant={"secondary"}  onClick={onCancelDraft}>Cancel</Button>
        </ButtonGroup>
      )}
        
    </NoteContainer>
  )
}
