import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import { locatorEqual } from '../utils/utils';
import { Note } from '../types';
import { NoteComponentInterface } from '../diff-viewer/shared';


async function getAnnotations(){
  const diffId = 9
  const url = `/diffs/${diffId}/annotations`
  return api.get(url).then(res => {
    return res.data
  })
}

export function AnnotationNote(data: NoteComponentInterface) {

  // Queries
  const query = useQuery(['annotations'], getAnnotations)
  const matchingNotes = useMemo(() => query.data?.filter(note => locatorEqual(note.locator, data.locator)), [query.data]);
  
  if(!matchingNotes) {
    return
  }
  
  return matchingNotes.map((note: Note) => {
    return (
      <div style={{backgroundColor: 'red'}}>
        {note.body}
      </div>
    )
  })
}
