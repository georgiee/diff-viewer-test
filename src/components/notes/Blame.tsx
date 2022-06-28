import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { NoteType } from '../../types';
import { formatDate } from '../utils';

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

export function NoteBase({note, onSaveDraft, onCancelDraft, onUpdateNote, onEditNote}) {
  const [editing, setEdit] = useState(note.edit)
  const [message, setMessage] = useState(note.body);
  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  
  
  const createNoteCopy = () => {
    return {
     ...note, body: message
    }
  }
  return (
    <NoteContainer noteType={note.type}>
      ok
      <Meta note={note}/>
      { editing && <textarea value={message} onChange={handleChange} placeholder="Provide your comment"/>}
      { !editing && note.body}

      {/* Actions while viewing*/}
      <div>
        {
          !editing && (
            <button onClick={() => onEditNote()}>Edit</button>
          )
        }
      </div>
      
      {/* Actions while edit a note */}
      <div>
        {
          editing && (
            <button onClick={() => onUpdateNote(createNoteCopy())}>Save</button>
          )
        }
      </div>
      
      {/* Action to save draft*/}
      {note.draft && (
        <div>
          <button onClick={() => onSaveDraft(createNoteCopy())}>Save</button>
          <button onClick={onCancelDraft}>Cancel</button>
        </div>
      )}
        
    </NoteContainer>
  )
}
