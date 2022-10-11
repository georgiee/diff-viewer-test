import { api } from '../../api';
import { Comment } from '../../types';

export async function fetchComments (reviewId){
  return api.get(`/reviews/${reviewId}/comments`).then(res => res.data)
}

export async function patchComment(reviewId, id, payload) {
  return api.patch<Comment>(`/reviews/${reviewId}/comments/${id}`, payload).then(res => res.data)
}

export async function deleteComment(reviewId, {id}){
  return api.delete<Comment>( `/reviews/${reviewId}/comments/${id}`).then(res => res.data)
}

export async function newComment(reviewId, {body, locator}){
  const url = `/reviews/${reviewId}/comments`

  const data = {body: body, locator: locator.join(',')}
  const response = await api.post<Comment>(url, data)
  
  return response.data;
}
