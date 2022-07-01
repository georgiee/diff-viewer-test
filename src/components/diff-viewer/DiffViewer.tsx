import React from "react";
import { File } from './File';
import { useDiff } from '../providers/DiffContext';
import { useStore } from '../providers/NotesContext';

export const DiffViewer = () => {
  const { diffData, status, mode } = useDiff();

  const fetch = useStore((state: any) => state.fetch);
  fetch()
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
