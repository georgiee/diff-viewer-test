import { Note } from './types';
import axios from 'axios';

export const createApiClient = ({base, token}) => axios.create({
  baseURL: base,
  timeout: 1000,
  headers: {'Authorization': 'Bearer '+ token}
});

export function createDiffApi(client, diffId) {
  const getDiff = async () => {
    const response = await client.get(`/diffs/${diffId}`)
    return response.data;
  }

  /**
   * annotations
   */
  const getAnnotations = async () => {
    const response = await client.get(`/diffs/${diffId}/annotations`)
    return response.data;
  }

  const createAnnotation = async (note: Note) => {
    const data = {diff: diffId, body: note.body, locator: note.locator.join(',')}
    const response = await client.post(`/annotations`, data)
    return response.data;
  }

  const deleteAnnotation = async (id: string) => {
    const response = await client.delete(`/annotations/${id}`)
    return response.data;
  }

  const updateAnnotation = async (note: Note) => {
    const response = await client.patch(`/annotations/${note.id}`, {
      body: note.body
    })
    return response.data;
  }


  return {
    getDiff, getAnnotations, createAnnotation, deleteAnnotation, updateAnnotation
  }
}

export function createReviewApi(client, reviewId) {
  /**
   * comments
   */
  const getComments = async () => {
    const response = await client.get(`/reviews/${reviewId}/comments`)
    return response.data;
  }

  const createComment = async (note: Note) => {
    const data = {body: note.body, locator: note.locator.join(',')}
    const response = await client.post(`/reviews/${reviewId}/comments`, data)
    return response.data;
  }

  const deleteComment = async (note: Note) => {
    const response = await client.delete(`/reviews/${reviewId}/comments/${note.id}`)
    return response.data;
  }

  const updateComment = async (note: Note) => {
    const response = await client.patch(`/reviews/${reviewId}/comments/${note.id}`, {
      body: note.body
    })
    return response.data;
  }

  return {
    getComments, createComment, delete: deleteComment, updateComment
  }
}
