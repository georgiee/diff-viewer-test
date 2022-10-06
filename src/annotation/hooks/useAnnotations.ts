import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as noteApi from '../api/note';
import { Locator } from '../../types';

export const useAnnotations = (diffId) => {
  const queryClient = useQueryClient();
  
  const annotationsQuery = useQuery(['annotations'], () => noteApi.fetchNotes(diffId))

  const updateAnnotation = useMutation(async (params: { id: string, note: any }) => {
    return noteApi.patchNote(diffId, params)
  })

  const deleteAnnotation = useMutation(async (params: { id: string}) => {
    return noteApi.deleteNote(diffId, params)
  }, {onSuccess: () => queryClient.invalidateQueries(['annotations'])})

  const newAnnotation = useMutation(async (params: { body: string, locator: Locator}) => {
    return noteApi.newNote(diffId, params)
  }, {onSuccess: () => queryClient.invalidateQueries(['annotations'])})
  
  return {
    annotationsQuery,
    updateAnnotation,
    deleteAnnotation,
    newAnnotation
  }
}
