import { api } from '../api';
import { Note } from '../types';

/**
 * idea to organize 
 * https://dev.to/michaelmangial1/wrapping-react-querys-usemutation-a-use-case-for-wrapping-external-libraries-4nj8
 * https://betterprogramming.pub/7-tips-for-using-react-query-in-large-projects-22ccc49d61c2
 */
export async function patchAnnotation(diffId, {id, note}) {
  return api.patch<Note>(`/diffs/${diffId}/annotations/${id}`, {
    body: note.body
  })
}

export async function deleteAnnotation(diffId, {id}){
  return api.delete<Note>( `/diffs/${diffId}/annotations/${id}`)
}

export async function fetchAnnotations (diffId){
  return api.get(`/diffs/${diffId}/annotations`).then(res => {
    return res.data
  })
}

export async function newAnnotation(diffId, {body, locator}){
  const url = `/diffs/${diffId}/annotations`

  const data = {body: body, locator: locator.join(',')}
  const response = await api.post<Note>(url, data)

  return response.data;
}
