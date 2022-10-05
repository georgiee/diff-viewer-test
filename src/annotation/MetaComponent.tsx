import React, { useReducer, useState } from 'react';
import { Message } from '../components/notes/components/Message';
import { Button, ButtonGroup } from 'react-bootstrap';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px dotted red;
  padding: 10px;
  background-color: antiquewhite;
`

export const MetaComponent = () => {

  const availableQuestions = [
    { value: 'chocolate', label: 'The first question' },
    { value: 'strawberry', label: 'The second question' },
  ]


  return (
    <div>
      <p>meta data goes here</p>

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
          <select multiple>
            {availableQuestions.map(item => (
              <option key={item.value}>{item.label}</option>
            ))}
          </select>
        </label>
      </Container>
    </div>
  )
}
