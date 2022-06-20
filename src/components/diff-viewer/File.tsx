import React from "react";
import { Hunk } from "./Hunk";
import styled from "styled-components";
import * as diffTypes from './types';

interface FileProps {
  file: diffTypes.File;
}

const FileContainer = styled.div`
  padding: 0 8px;
  margin-bottom: 48px;

  border: 1px solid #2c3e50;
  border-radius: 8px;
`;

const NameContainer = styled.p`
  font-size: 24px;
  font-weight: 700;

  margin: 8px 0;
`;


export const File = ({ file }: FileProps) => {
  return (
    <FileContainer>
      <NameContainer>{file.new_path ?? file.old_path}</NameContainer>
      {file.hunks.map((hunk) => (
        <Hunk hunk={hunk} key={hunk.index} />
      ))}
    </FileContainer>
  );
};
