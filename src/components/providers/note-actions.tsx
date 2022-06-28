import { NotesState } from './NotesContext';
import produce from "immer"
import { find, findIndex } from 'lodash';
import { Note } from '../../types';

let DRAFT_COUNTER = 0;

const createDraftNote = (locator): Note => ({
  draft: true, id: `draft-${DRAFT_COUNTER++}`, locator: locator, body: "", type: "annotation"
})

export const createNoteActions = annotationApi => (set, get, api) => ({
  cancelEdit: (id) => {
    set(
      produce((state: NotesState) => {
        const note = find(state.notes, {id})
        note.edit = false
      })
    )
  },
  deleteNote: async (id) => {
    await annotationApi.deleteAnnotation(id)
    set(
      produce((state: NotesState) => {
        const index = findIndex(state.notes, { id });
        state.notes.splice(index, 1)
      })
    )
  },
  editNote: (id) => {
    set(
      produce((state: NotesState) => {
        const note = find(state.notes, {id})
        note.edit = true
      })
    )
  },
  updateNote: async (note) => {
    const updatedNote = await annotationApi.updateAnnotation(note)

    set(
      produce((state: NotesState) => {
        console.log('updateNote', state)
        const index = state.notes.findIndex(item => item.id === note.id)
        state.notes.splice(index, 1, updatedNote)
      })
    )
  },
  createDraft: (locator) => {
    set(
      produce((state: NotesState) => {
        state.notes.unshift(createDraftNote(locator))
      })
    )
  },
  saveDraft: async (note) => {
    const newNote = await annotationApi.createAnnotation(note)
    set(
      produce((state: NotesState) => {
        const index = state.notes.findIndex(item => item.id === note.id)
        state.notes.splice(index, 1, newNote)
      })
    )
  },
  cancelDraft: async (note) => {
    if(!note.draft) {
      return
    }
    set(
      produce((state: NotesState) => {
        const index = state.notes.findIndex(item => item.id === note.id)
        state.notes.splice(index, 1)
      })
    )
  },
  fetch: async () => {
    const response = await annotationApi.fetch();
    set({notes: response})
  }
})
