import { Note } from '../types';
import { NoteApiInterface } from './base';
import { AxiosInstance } from 'axios';

export function createReviewApi(client: AxiosInstance, reviewId): NoteApiInterface {
  /**
   * comments
   */
  const fetch = async () => {
    const response = await client.get<Note[]>(`/reviews/${reviewId}/comments`)
    return response.data;
  }

  const create = async (note: Note) => {
    const data = {body: note.body, locator: note.locator.join(',')}
    const response = await client.post<Note>(`/reviews/${reviewId}/comments`, data)
    return response.data;
  }

  const remove = async (id: string) => {
    const response = await client.delete<Note>(`/reviews/${reviewId}/comments/${id}`)
    return response.data;
  }

  const update = async (note: Note) => {
    const response = await client.patch<Note>(`/reviews/${reviewId}/comments/${note.id}`, {
      body: note.body
    })
    return response.data;
  }

  return {
    fetch, create, remove, update
  }
}
