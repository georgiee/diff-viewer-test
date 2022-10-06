import React, { useReducer, useState } from 'react';
import styled from 'styled-components';
import { useQuestions } from './hooks/useQuestions';

const Container = styled.div`
  border: 1px dotted red;
  padding: 10px;
  background-color: antiquewhite;
`

export const MetaComponent = ({saveQuestionsCallback, questions}) => {
  const {questionsQuery} = useQuestions()

  const { isLoading, isError, data, error } = questionsQuery
  const [isEditingQuestions, toggleEditingQuestions] = useReducer((state) => !state, false);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>();
  
  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error</span>
  }

  
  const handleAddQuestions = () => {
    toggleEditingQuestions()
  }
  
  const handleSaveQuestions = () => {
    saveQuestionsCallback(selectedQuestions);
    toggleEditingQuestions()
  }

  const handleCancelQuestions = () => {
    setSelectedQuestions([]);
    toggleEditingQuestions()
  }

  const handleSelectedQuestionsChanged = (event) => {
    const values = Array.from(event.target.selectedOptions, (option:any) => option.value);
    setSelectedQuestions(values)
  }
  
  const givenQuestionIds = questions.map(q => q.id);
  
  return (
    <div>
      {/*<div>*/}
      {/*  Skill Level*/}
      {/*  */}
      {/*  <p>Select the minimum level this issue should be found by</p>*/}

      {/*  <label>*/}
      {/*    Junior <input type={'radio'}/>*/}
      {/*  </label>*/}
      {/*  <label>*/}
      {/*    Intermediate <input type={'radio'}/>*/}
      {/*  </label>*/}
      {/*  <label>*/}
      {/*    Expert <input type={'radio'}/>*/}
      {/*  </label>*/}
      {/*  */}
      {/*</div>*/}
  
      <Container>
        <label>
          <p>Assign related questions that are interesting in the context of this annotation</p>
          <button onClick={handleAddQuestions}>Update Questions</button>
          {!isEditingQuestions && (
            <div>
          {questions.map(question => (<div key={question.id}>{question.question}</div>))}
            </div>
          )}
          {isEditingQuestions && (
            <div>
              <select defaultValue={givenQuestionIds} multiple onChange={handleSelectedQuestionsChanged}>
                {data.map(item => (
                  <option key={item.id} value={item.id}>{item.question}</option>
                ))}
              </select>
              <br/>
              <button onClick={handleSaveQuestions}>Save</button>
              <button onClick={handleCancelQuestions}>Cancel</button>
            </div>
          )}
        </label>
      </Container>
    </div>
  )
}
