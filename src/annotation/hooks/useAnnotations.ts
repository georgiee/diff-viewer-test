import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as noteApi from '../api/note';
import { Locator } from '../../types';

export const useAnnotations = (diffId) => {
  const queryClient = useQueryClient();
  
  const annotationsQuery = useQuery(['annotations'], () => noteApi.fetchNotes(diffId))

  const updateAnnotation = useMutation(async (params: { id: string, note: any }) => {
    return noteApi.patchNote(diffId, params.id, {body: params.note.body})
  }, {
    onSuccess: (updatedAnnotation, variables) => {
      queryClient.setQueryData(['annotations', variables.id], updatedAnnotation)
    },
  })

  const deleteAnnotation = useMutation(async (params: { id: string}) => {
    return noteApi.deleteNote(diffId, params)
  }, {
    onSuccess: () => queryClient.invalidateQueries(['annotations'])
  })

  const newAnnotation = useMutation(async (params: { body: string, locator: Locator}) => {
    return noteApi.newNote(diffId, params)
  }, {
    onSuccess: (newAnnotation) => {
      // optimistic update instead of invalidating everything
      queryClient.setQueryData(['annotations'], (old: any) => [newAnnotation, ...old])
    },
  })

  const saveQuestions = useMutation(async (params: { id: string, questions: string[] }) => {
    return noteApi.patchNote(diffId, params.id, {questions: params.questions})
  }, {
    onSuccess: (newAnnotation: any) => {
      // optimistic update instead of invalidating everything. no error handling yet.
      queryClient.setQueryData(['annotations'], (old: any) => {
        const index =  old.findIndex(obj => obj.id === newAnnotation.id)
        const newList = old.slice(0)
        newList.splice(index, 1, newAnnotation)
        
        return newList
      })
    },
  })
  
  return {
    annotationsQuery,
    updateAnnotation,
    deleteAnnotation,
    newAnnotation,
    saveQuestions
  }
}
