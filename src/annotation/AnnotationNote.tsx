import React, { useEffect, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';
import { locatorEqual } from '../utils/utils';
import { Note } from '../types';
import { NoteComponentInterface } from '../diff-viewer/shared';
import { AnnotationConfigSingleton } from './config';
import { useDiff } from '../diff-viewer/DiffContext';


async function getAnnotations(){
  const diffId = AnnotationConfigSingleton.diffId
  const url = `/diffs/${diffId}/annotations`
  return api.get(url).then(res => {
    return res.data
  })
}

async function newAnnotationFn({body, locator}){
  console.log('mutate new annotation')

  const diffId = AnnotationConfigSingleton.diffId
  const url = `/diffs/${diffId}/annotations`

  const data = {body: body, locator: locator.join(',')}
  const response = await api.post<Note>(url, data)

  return response.data;
}


function addDraft() {
  console.log('addDraft')
}

const NoteComponent = ({note, diffId}) => {

  function deleteAnnotationFn({id}){
    return api.delete<Note>( `/diffs/${diffId}/annotations/${id}`)
  }
  
  const deleteAnnotation = useMutation(deleteAnnotationFn)
  const queryClient = useQueryClient()
  
  return (
    <div style={{backgroundColor: 'red'}}>
      {note.body}
      <div>
        {deleteAnnotation.isLoading ? (
          'Deleting...'
        ) : (<>
          {deleteAnnotation.isSuccess ? <div>Annotation removed!</div> : null}

          <button
            onClick={() => {
              deleteAnnotation.mutate({ id: note.id }, {
                onSuccess: () => {
                  console.log('remove success')
                  // ✅ refetch the comments list for our blog post
                  queryClient.invalidateQueries(['annotations'])

                },
              })
            }}
          >
            Delete Annotation
          </button>
        </>)}
      </div>
    </div>
  )
}

export function AnnotationNote(data: NoteComponentInterface) {
  const queryClient = useQueryClient()
  const query = useQuery(['annotations'], getAnnotations)

  const newAnnotation = useMutation(newAnnotationFn);

  // Queries
  const {diffId} = useDiff();
  
  function addDraft() {
    console.log('add draft')
    newAnnotation.mutate({ body: "works", locator: data.locator },  {
      onSuccess: () => {
        console.log('add success')
        // ✅ refetch the comments list for our blog post
        queryClient.invalidateQueries(['annotations'])

      },

    })
  }
  
  useEffect(() => {
    data.addDraftFnRef.current = addDraft
  }, []);

  
  const matchingNotes = useMemo(() => query.data?.filter(note => locatorEqual(note.locator, data.locator)), [query.data]);


  
  if(!matchingNotes) {
    return
  }

  
  return matchingNotes.map((note: Note) => {

    return (
      <div key={note.id}>
        <NoteComponent diffId={diffId} note={note}/>
      </div>
    )
  })
}
