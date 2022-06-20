import React, { useContext, useEffect, useState } from "react";
import { Line } from "./line";
import styled from "styled-components";

import * as diffTypes from './types';
import { createDiffClient, useDiff } from './DiffContext';

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
  const { NoteRenderer, apiConfig, diffId } = useDiff();
  const apiClient = createDiffClient(apiConfig);
  
  const [annotations, setAnnotations] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiClient.get(`/diffs/${diffId}/annotations`)
      setAnnotations(response.data);
    };

    fetchData();
  }, [diffId])
  
  const lines = hunk.lines
  
  console.log({annotations})
  return (
    <HunkContainer>
      <Header>{hunk.header}</Header>
      {
        lines.map(line =>  (
          <React.Fragment key={line.locator.join()} >
            <Line line={line}/>
            <NoteRenderer locator={line.locator}/>
          </React.Fragment>
        ))
      }
      
    </HunkContainer>
  );
};
