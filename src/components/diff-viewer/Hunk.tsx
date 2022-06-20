import React from "react";
import { Line } from "./line";
import styled from "styled-components";

import * as diffTypes from './types';

interface HunkProps {
  hunk: diffTypes.Hunk;
}

const HunkContainer = styled.div`
  overflow-x: scroll;
`;

const Header = styled.p`
  background-color: #ddf4ff;
`;

export const Hunk = ({ hunk }: HunkProps) => {
  return (
    <HunkContainer>
      <Header>{hunk.header}</Header>
      {hunk.lines.map((line) => (
        <Line line={line} key={line.locator.join()} />
      ))}
    </HunkContainer>
  );
};
