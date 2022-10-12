import React from 'react';
import { Message } from '../../components/notes/components/Message';
import styled from 'styled-components';


const Container = styled.div`
  background-color:  floralwhite;
  padding: 10px;
  border: 2px solid #666;
  border-top: 5px solid #333;
  margin-bottom: 10px;
`

export const NoteComponent = ({note}) => {
  return (
    <Container>
      <Message editing={false} message={note.body}/>
    </Container>
  )
}
