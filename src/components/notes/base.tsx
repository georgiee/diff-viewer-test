import { NoteType } from '../../types';
import styled, { css } from 'styled-components';
import React from 'react';
import { formatDate } from '../utils';

export const NoteContainer = styled.div`
  background-color: #cecece;
  padding: 20px;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 10px;
  ${({noteType}) => noteType == NoteType.COMMENT && css`background: #FFDB58`}
  ${({noteType}) => noteType == NoteType.ANNOTATION && css`background: #85b9ff`}
`
export const AuthorContainer = styled.span`
  font-style: italic;
  font-weight: bold;
`
const MetaContainer = styled.div`
  margin-bottom: 10px
`
const Author = ({author}) => {
  return (
    <AuthorContainer>
      {author.name ?? "Unknown"}
    </AuthorContainer>
  )
}
export const Meta = ({note}) => {
  if (note.draft) {
    return null;
  }

  return (
    <MetaContainer>
      <Author author={note.author}/> wrote on ({formatDate(note.created_at)})
    </MetaContainer>
  )
}
