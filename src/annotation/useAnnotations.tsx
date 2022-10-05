import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as api from './api';
import { Locator } from '../types';

export const useAnnotations = (diffId) => {
  const queryClient = useQueryClient();
  
  const annotationsQuery = useQuery(['annotations'], () => api.fetchAnnotations(diffId))

  const updateAnnotation = useMutation(async (params: { id: string, note: any }) => {
    return api.patchAnnotation(diffId, params)
  })

  const deleteAnnotation = useMutation(async (params: { id: string}) => {
    return api.deleteAnnotation(diffId, params)
  }, {onSuccess: () => queryClient.invalidateQueries(['annotations'])})

  const newAnnotation = useMutation(async (params: { body: string, locator: Locator}) => {
    return api.newAnnotation(diffId, params)
  }, {onSuccess: () => queryClient.invalidateQueries(['annotations'])})
  
  return {
    annotationsQuery,
    updateAnnotation,
    deleteAnnotation,
    newAnnotation
  }
}
