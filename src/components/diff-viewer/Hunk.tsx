import React from "react";
import styled from "styled-components";

import * as diffTypes from './types';
import { useDiff } from './DiffContext';
import { Line } from './Line';

interface HunkProps {
  hunk: diffTypes.Hunk;
}

const HunkContainer = styled.div`
  overflow-x: scroll;
`;

const Header = styled.div`
  background-color: #ddf4ff;
`;

export const Hunk = ({ hunk }: HunkProps) => {
  const { NoteRenderer, annotations, dispatchAnnotations } = useDiff();
  const lines = hunk.lines
  
  return (
    <HunkContainer>
      <Header>{hunk.header}</Header>
      {
        lines.map(line =>  (
          <React.Fragment key={line.locator.join()} >
            <Line line={line} addDraft={(locator) => dispatchAnnotations({type: "ADD_DRAFT", locator})} />
            <NoteRenderer locator={line.locator} annotations={annotations}/>
          </React.Fragment>
        ))
      }
      
    </HunkContainer>
  );
};
