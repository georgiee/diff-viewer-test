import React from 'react';
import { Message } from '../../../shared/Message';
import styled, { css } from 'styled-components';
import { NoteType } from '../../../types';

export const Container = styled.div`
  background-color: #cecece;
  margin-bottom: 10px;

  padding: 10px;
  border: 2px solid #666;
  border-top: 5px solid #333;
  
  ${({noteType}) => noteType == NoteType.COMMENT && css`background: #FFDB58`}
  ${({noteType}) => noteType == NoteType.ANNOTATION && css`background: #85b9ff`}
`

export const NoteComponent = ({note}) => {
  return (
    <Container noteType={note.type}>
      {note.author && (
        <div>
          <strong>Author</strong>:
          {note.author.name}
        </div>
      ) }
      <Message editing={false} message={note.body}/>
    </Container>
  )
}
