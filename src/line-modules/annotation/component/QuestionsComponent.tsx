import React, { useReducer, useState } from 'react';
import styled from 'styled-components';
import { useQuestions } from '../hooks/useQuestions';

const Container = styled.div`
  border: 1px dotted red;
  padding: 10px;
  background-color: antiquewhite;
  margin-top: 20px;
`

export const QuestionsComponent = ({saveQuestionsCallback, questions, onChangeQuestions, editing}) => {
  
  if(!questions) {
    return <div>error with questions</div>
  }
  
  const {questionsQuery} = useQuestions()

  const { isLoading, isError, data, error } = questionsQuery
  
  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error</span>
  }

  const handleSelectedQuestionsChanged = (event) => {
    const values = Array.from(event.target.selectedOptions, (option:any) => option.value);
    onChangeQuestions(values)
  }
  
  const givenQuestionIds = questions.map(q => q.id);
  
  if(editing) {
    return (
      <Container>
        <p>Assign related questions that are interesting in the context of this annotation</p>
        <div>
          <select defaultValue={givenQuestionIds} multiple onChange={handleSelectedQuestionsChanged}>
            {data.map(item => (
              <option key={item.id} value={item.id}>{item.question}</option>
            ))}
          </select>
        </div>
      </Container>
    )
  }else if(questions.length > 0) {
    return (
      <Container>
        <details>
          <summary>
            <strong>Assigned Questions({questions.length})</strong>
          </summary>
          {questions.map(question => (<div key={question.id}>{question.question}</div>))}
        </details>
      </Container>
    )
  }
  
  
  return null
}
