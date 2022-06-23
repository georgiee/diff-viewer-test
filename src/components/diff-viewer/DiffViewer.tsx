import React from "react";
import { File } from './File';
import { useDiff } from './DiffContext';

export const DiffViewer = () => {
  const { diffData, diffStatus } = useDiff();

  if(diffStatus === 'error'){
    return <div style={{color: 'red'}}>⚠️ error loading the given diff</div>;
  }else if (diffStatus !== 'fetched') {
    return <div>loading diff daya</div>;
  }
  const files = diffData.files;

  return (
    <div>
      <h1>{diffData.title} ({diffData.id })</h1>
      {
        files.map(file => <File file={file} key={file.index} />)
      }
    </div>
  );
};
