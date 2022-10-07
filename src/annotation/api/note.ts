import { api } from '../../api';
import { Note } from '../../types';

/**
 * idea to organize 
 * https://dev.to/michaelmangial1/wrapping-react-querys-usemutation-a-use-case-for-wrapping-external-libraries-4nj8
 * https://betterprogramming.pub/7-tips-for-using-react-query-in-large-projects-22ccc49d61c2
 */
export async function patchNote(diffId, id, payload) {
  return api.patch<Note>(`/diffs/${diffId}/annotations/${id}`, payload).then(res => res.data)
}

export async function deleteNote(diffId, {id}){
  return api.delete<Note>( `/diffs/${diffId}/annotations/${id}`).then(res => res.data)
}

export async function fetchNotes (diffId){
  return api.get(`/diffs/${diffId}/annotations`).then(res => res.data)
}

export async function newNote(diffId, {body, locator}){
  const url = `/diffs/${diffId}/annotations`

  const meta = {optional: true}
  const data = {body: body, locator: locator.join(','), meta: meta}
  const response = await api.post<Note>(url, data)

  return response.data;
}
