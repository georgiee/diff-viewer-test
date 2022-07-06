import { NoteApiInterface } from './base';

export function createInterviewApi(client, reviewId): NoteApiInterface {
  /**
   * comments
   */
  const fetch = async () => {
    const response = await client.get(`/reviews/${reviewId}/interview`)
    return response.data;
  }

  return {
    fetch
  }
}
