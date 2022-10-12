import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as commentApi from '../api/comment';
import { Locator } from '../../../types';

export const useComments = (reviewId) => {
  const queryClient = useQueryClient();
  const commentsQuery = useQuery(['comments'], () => commentApi.fetchComments(reviewId))

  const updateComment = useMutation(async (params: { id: string, note: any }) => {
    return commentApi.patchComment(reviewId, params.id, {body: params.note.body})
  }, {
    onSuccess: (updatedComment, variables) => {
      queryClient.setQueryData(['comments', variables.id], updatedComment)
    },
  })

  const deleteComment = useMutation(async (params: { id: string}) => {
    return commentApi.deleteComment(reviewId, {id: params.id})
  }, {
    onSuccess: () => queryClient.invalidateQueries(['comments'])
  })

  const newComment = useMutation(async (params: { body: string, locator: Locator}) => {
     return commentApi.newComment(reviewId, params)
  }, {
    onSuccess: (newComment, variables) => {
      // optimistic update instead of invalidating everything
      queryClient.setQueryData(['comments'], (old: any) => [newComment, ...old])
    },
  })

  return {
    commentsQuery,
    updateComment,
    deleteComment,
    newComment
  }
}
