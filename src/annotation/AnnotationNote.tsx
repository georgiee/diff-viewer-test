import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';
import { locatorEqual } from '../utils/utils';
import { Note } from '../types';
import { NoteComponentInterface } from '../diff-viewer/shared';
import { AnnotationConfigSingleton } from './config';
import { useDiff } from '../diff-viewer/DiffContext';
import { Message } from '../components/notes/components/Message';
import { Button, ButtonGroup } from 'react-bootstrap';


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

const BetterNote = ({note, onSave, onDelete, onCancel}) => {
  const [editing, setEdit] = useState(note.draft)
  const [message, setMessage] = useState(note.body);
  
  const toggleEdit = (value:boolean | null = null) => {
    if(value != null) {
      setEdit(value)
    }else {
      setEdit(!editing)
    }
  }
  
  function saveNote() {
    console.log('message', message)
    setEdit(false)
    onSave({
      ...note,
      body: message
    })
  }
  
  return (
    <div>
      <Message editing={editing} message={message} onChange={(event) => setMessage(event.target.value)}/>
      
      <div>
        <ButtonGroup size={"sm"}>
          {!editing && <Button variant={"primary"} onClick={() => toggleEdit()}>Edit</Button>}
          {editing && <Button variant={"primary"} onClick={saveNote}>Save</Button>}
          {!editing && <Button variant={"danger"} onClick={onDelete}>Delete</Button>}
          {editing && <Button variant={"secondary"} onClick={() =>{
            toggleEdit(false); onCancel()
          }}>Cancel</Button>}
        </ButtonGroup>
      </div>
    </div>
  )
}

const NoteComponent = ({note, diffId}) => {
  const [editing, setEdit] = useState(false)
  const [message, setMessage] = useState(note.body);

  useEffect(() => {
    setEdit(note.draft);
  }, [note.draft])
  
  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  
  function deleteAnnotationFn({id}){
    return api.delete<Note>( `/diffs/${diffId}/annotations/${id}`)
  }
  
  const deleteAnnotation = useMutation(deleteAnnotationFn)
  const queryClient = useQueryClient()
  
  return (
    <div style={{backgroundColor: 'red'}}>
      <Message editing={editing} message={message} onChange={handleChange}/>
      
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

let draftCounter = 0;
export function AnnotationNote(data: NoteComponentInterface) {
  const queryClient = useQueryClient()
  const query = useQuery(['annotations'], getAnnotations)

  
  const [drafts, setDrafts] = useState<any[]>([])
  // Queries
  const {diffId} = useDiff();

  const memoizedCallback = useCallback(
    () => {
      draftCounter++
      const draftNote = {draft: true, id: `draft-${draftCounter}`, body: "", locator: data.locator}
      setDrafts([...drafts, draftNote])
    },
    [drafts],
  );



  const newAnnotation = useMutation(newAnnotationFn);


  useEffect(() => {
    data.addDraftFnRef.current = memoizedCallback
  }, [drafts]);


  function deleteAnnotationFn({id}){
    return api.delete<Note>( `/diffs/${diffId}/annotations/${id}`)
  }

  const deleteAnnotation = useMutation(deleteAnnotationFn)

  function updateAnnotationFn({id, note}) {
    return api.patch<Note>(`/diffs/${diffId}/annotations/${id}`, {
      body: note.body
    })
  }
  
  const updateAnnotation = useMutation(updateAnnotationFn)

  
  const matchingNotes = useMemo(() => query.data?.filter(note => locatorEqual(note.locator, data.locator)) || [], [query.data]);
  const notes = drafts.concat(matchingNotes)
  
  function removeDraft(note) {
    const newDrafts = drafts.filter(draftNote => draftNote.id !== note.id)
    setDrafts(newDrafts)
  }
  return notes.map((note: Note) => {
    return (
      <BetterNote
        onCancel={() => {
          if(note.draft) {
            console.log('remove draft', note, drafts)
            removeDraft(note)
          }
        }}
        onSave={(newNote) => {
          if(newNote.draft) {
            newAnnotation.mutate({ body: newNote.body, locator: newNote.locator },  {
              onSuccess: () => {
                removeDraft(newNote)
                // ✅ refetch the comments list for our blog post
                queryClient.invalidateQueries(['annotations'])
              },
            })
          }else {
            updateAnnotation.mutate({ id: newNote.id, note: newNote }, {
              onSuccess: () => queryClient.invalidateQueries(['annotations']),
            })  
          }
          
        }}
        onDelete={() => deleteAnnotation.mutate({ id: note.id }, {
          onSuccess: () => queryClient.invalidateQueries(['annotations']),
        })}
        key={note.id} note={note}/>
    )
  })
}
