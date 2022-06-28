import axios from 'axios';
import { Note } from '../types';

export const createApiClient = ({base, token}) => axios.create({
  baseURL: base,
  timeout: 1000,
  headers: {'Authorization': 'Bearer '+ token}
});

export interface NoteApiInterface {
  fetch: () => Promise<Note[]>, 
  create?: (note: Note) => Promise<Note>,
  remove?: (id: string) => Promise<Note>
  update?: (note: Note) => Promise<Note>
}
