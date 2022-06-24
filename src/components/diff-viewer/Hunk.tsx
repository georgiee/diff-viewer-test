import React from "react";
import styled from "styled-components";

import * as diffTypes from '../../types';
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
  const lines = hunk.lines

  return (
    <HunkContainer>
      <Header>{hunk.header}</Header>
      {
        lines.map(line =>  (
          <React.Fragment key={line.locator.join()} >
            <Line line={line} />
          </React.Fragment>
        ))
      }
      
    </HunkContainer>
  );
};
