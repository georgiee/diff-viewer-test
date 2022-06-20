import React from "react";
import { Diff } from './types';
import { File } from './File';

interface DiffViewerProps {
  data: Diff;
}

export const DiffViewer = ({ data }: DiffViewerProps) => {
  return (
    <div>
      <h1>{data.title}1</h1>
        {data?.files.map((file) => (
          <File file={file} key={file.index} />
        ))}
    </div>
  );
};
