import React from "react";
import { File } from './File';
import { useDiff } from '../providers/DiffContext';

export const DiffViewer = () => {
  const { diffData, status, mode } = useDiff();

  if(status === 'error'){
    return <div style={{color: 'red'}}>⚠️ error loading the given diff</div>;
  }else if (status !== 'fetched') {
    return <div>loading diff daya</div>;
  }
  const files = diffData.files;

  return (
    <div>
      <h1>{diffData.title} ({diffData.id }) (Mode: {mode})</h1>
      {
        files.map(file => <File file={file} key={file.index} />)
      }
    </div>
  );
};
