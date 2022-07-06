import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import * as diffTypes from '../types';
import { useDiff } from './DiffContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface LineProps {
  line: diffTypes.Line;
}

const LineContainer = styled.div<{ type: "context" | "add" | "remove" }>`
  display: grid;
  grid-template-columns: 50px 50px 30px 30px auto 1fr;
  white-space: pre;

  padding-left: 16px;
  background-color: ${({ type }) => getLineColor(type)};
`;

const ActionContainer = styled.div`
  color: blue;
  cursor: pointer;
`;

const getLineColor = (type: string) => {
  switch (type) {
    case "add":
      return "#ecfdf0";
    case "remove":
      return "#fbe9eb";
  }
};

const getLineGutter = (type: string) => {
  switch (type) {
    case "add":
      return "+";
    case "remove":
      return "-";
  }
};


export const Line = ({ line }: LineProps) => {
  const [hoverActive, setHoverActive] = useState(false);
  const addDraftFn = useRef<Function>(null);

  const addDraft = useCallback(
    (locator) => {
      if(addDraftFn.current) {
        addDraftFn.current(locator)
      }
    },
    [addDraftFn.current],
  );
  
  const { readonly, LineRenderer} = useDiff()
  // const addDraft = useStore((state: any) => state.createDraft)
  return (
    <>
      <LineContainer
        title={line.locator.join(',')}
        type={line.type}
        onMouseEnter={() => setHoverActive(true)}
        onMouseLeave={() => setHoverActive(false)}
      >
        <div>{line.original_line_number}</div>
        <div>{line.new_line_number}</div>
        {
          (!readonly) && (
            <ActionContainer onClick={() => addDraft && addDraft(line.locator)}>
              {hoverActive && <FontAwesomeIcon size="1x" bounce icon="plus-square" />}
            </ActionContainer>
          )
        }
        
        <div>{getLineGutter(line.type)}</div>
        <div>{line.content}</div>
      </LineContainer>
      
      { LineRenderer && <LineRenderer addDraftFnRef={addDraftFn} locator={line.locator}  /> }
    </>
  );
};
