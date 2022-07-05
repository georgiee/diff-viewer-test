import React from "react";
import { Hunk } from "./Hunk";
import styled from "styled-components";
import * as diffTypes from '../types';

interface FileProps {
  file: diffTypes.File;
}

const FileToggle = styled.details`
  padding: 0 8px;
  margin-bottom: 48px;

  border: 1px solid #2c3e50;
  border-radius: 8px;
`;

const Title = styled.span`
  cursor: pointer;
  font-size: 24px;
  font-weight: 700;
`;


export const File = ({ file }: FileProps) => {
  const hunks = file.hunks;
  
  return (
    <FileToggle open>
      <summary>
        <Title>{file.new_path ?? file.old_path}</Title>  
      </summary>
      
      {hunks.map(hunk =>  <Hunk hunk={hunk} key={hunk.index} />)}
    </FileToggle>
  );
};
