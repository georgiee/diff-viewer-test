import React from "react";
import styled from "styled-components";

import * as diffTypes from '../../types';
import { Line } from './Line';
import { useDiff } from '../providers/DiffContext';

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
  const { useNote } = useDiff();
  const { NoteRenderer, dispatch } = useNote();
  
  const lines = hunk.lines
  
  return (
    <HunkContainer>
      <Header>{hunk.header}</Header>
      {
        lines.map(line =>  (
          <React.Fragment key={line.locator.join()} >
            <Line line={line} addDraft={(locator) => dispatch({type: "ADD_DRAFT_NOTE", locator})} />
            <NoteRenderer locator={line.locator}/>
          </React.Fragment>
        ))
      }
      
    </HunkContainer>
  );
};
