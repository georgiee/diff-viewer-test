import React from "react";
import { File } from './File';
import { useDiff } from './DiffContext';

export const DiffViewer = () => {
  const { diffData, diffStatus } = useDiff();
  const files = diffData.files;

  if(diffStatus === 'error'){
    return <div style={{color: 'red'}}>⚠️ error loading the given diff</div>;
  }else if (diffStatus !== 'fetched') {
    return <div>loading diff daya</div>;
  }
  
  return (
    <div>
      <h1>{diffData.title} ({diffData.id })</h1>
      {
        files.map(file => <File file={file} key={file.index} />)
      }
    </div>
  );
};
