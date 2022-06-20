import React from "react";
import { Diff } from './types';
import { File } from './File';

interface DiffViewerProps {
  data: Diff;
}

export const DiffViewer = ({ data }: DiffViewerProps) => {
  const files = data.files;
  
  return (
    <div>
      <h1>{data.title}1</h1>
      {
        files.map(file => <File file={file} key={file.index} />)
      }
    </div>
  );
};
