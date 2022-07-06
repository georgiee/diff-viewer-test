import React from "react";
import { File } from './File';
import { useDiff } from './DiffContext';

export const DiffViewer = () => {
  const { diffData, status} = useDiff();
  if(status === 'error'){
    return <div style={{color: 'red'}}>⚠️ error loading the given diff</div>;
  }else if (status !== 'fetched') {
    return <div>loading diff daya</div>;
  }
  const files = diffData.files;

  return (
    <div>
      {
        files.map(file => <File file={file} key={file.index} />)
      }
    </div>
  );
};
