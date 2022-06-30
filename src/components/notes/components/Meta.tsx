import styled from 'styled-components';
import React from 'react';
import { formatDate } from '../../utils';

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
