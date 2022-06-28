import { Note } from '../types';
import { NoteApiInterface } from './base';
import { AxiosInstance } from 'axios';

export function createAnnotationApi(client: AxiosInstance, diffId): NoteApiInterface {
  const create = async (note: Note) => {
    const data = {diff: diffId, body: note.body, locator: note.locator.join(',')}
    const response = await client.post<Note>(`/annotations`, data)
    return response.data;
  }

  const remove = async (id: string) => {
    const response = await client.delete<Note>(`/annotations/${id}`)
    return response.data
  }

  const update = async (note: Note) => {
    const response = await client.patch<Note>(`/annotations/${note.id}`, {
      body: note.body
    })
    return response.data
  }

  const fetch = async () => {
    const response = await client.get<Note[]>(`/diffs/${diffId}/annotations`)
    return response.data;
  }

  return {
    fetch, create, remove, update
  } as NoteApiInterface;
}
