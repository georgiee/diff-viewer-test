import React, { useReducer, useState } from 'react';
import { Message } from '../../../shared/Message';
import { Button, ButtonGroup } from 'react-bootstrap';
import styled from 'styled-components';
import { QuestionsComponent } from './QuestionsComponent';


const Container = styled.div`
  background-color:  floralwhite;
  padding: 10px;
  border: 2px solid #666;
  border-top: 5px solid #333;
  margin-bottom: 10px;
`

export const NoteComponent = ({note, onSave, onDelete, onCancel}) => {
  const [isEditing, toggleEditing] = useReducer((state) => {
    return !state;
  }, note.draft);

  const [message, setMessage] = useState(note.body);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>(note.questions.map(q => q.id));
  
  function saveNote() {
    toggleEditing()

    onSave({
      ...note,
      body: message,
      questions: selectedQuestions
    })
  }
  
  function onChangeQuestions(ids) {
    setSelectedQuestions(ids)
  }
  
  return (
    <Container>
      {note.author && (
        <div>
          <strong>Author</strong>:
          {note.author.name}
        </div>
      ) }
      
      <Message editing={isEditing} message={message} onChange={(event) => setMessage(event.target.value)}/>

      {
        !note.draft && (
          <QuestionsComponent
            editing={isEditing}
            onChangeQuestions={onChangeQuestions}
            questions={note.questions}
            saveQuestionsCallback={(questionIds) => setSelectedQuestions(questionIds) }/>
        )
      }
      <br/><br/>
      <div>
        <ButtonGroup size={"sm"}>
          {!isEditing && <Button variant={"primary"} onClick={() => toggleEditing()}>Edit</Button>}
          {isEditing && <Button variant={"primary"} onClick={saveNote}>Save</Button>}
          {!isEditing && <Button variant={"danger"} onClick={onDelete}>Delete</Button>}
          {isEditing && <Button variant={"secondary"} onClick={() =>{
            toggleEditing(); onCancel()
          }}>Cancel</Button>}
        </ButtonGroup>
      </div>
    </Container>
  )
}
