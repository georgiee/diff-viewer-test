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

const Header = styled.div`
  background-color: #ddf4ff;
`;

export const Hunk = ({ hunk }: HunkProps) => {
  const lines = hunk.lines
  return (
    <HunkContainer>
      <Header>{hunk.header}</Header>
      {lines.map(line =>  <Line line={line} key={line.locator.join()} />)}
    </HunkContainer>
  );
};
