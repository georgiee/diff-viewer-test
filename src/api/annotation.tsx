import { Note } from '../types';
import { NoteApiInterface } from './base';
import { AxiosInstance } from 'axios';

export function createAnnotationApi(client: AxiosInstance, diffId): NoteApiInterface {
  
  const ENDPOINT = `/diffs/${diffId}/annotations`
  
  const create = async (note: Note) => {
    const data = {body: note.body, locator: note.locator.join(',')}
    const response = await client.post<Note>(ENDPOINT, data)
    return response.data;
  }

  const remove = async (id: string) => {
    const response = await client.delete<Note>(`${ENDPOINT}/${id}`)
    return response.data
  }

  const update = async (note: Note) => {
    const response = await client.patch<Note>(`${ENDPOINT}/${note.id}`, {
      body: note.body
    })
    return response.data
  }

  const fetch = async () => {
    const response = await client.get<Note[]>(ENDPOINT)
    return response.data;
  }

  return {
    fetch, create, remove, update
  } as NoteApiInterface;
}
