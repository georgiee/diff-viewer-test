import { NotesState } from './NotesContext';
import produce from "immer"
import { find, findIndex } from 'lodash';
import { DiffMode, Note, NoteType } from '../../types';
import * as api from '../../api';

let DRAFT_COUNTER = 0;

const createDraftNote = (locator, type): Note => ({
  draft: true, id: `draft-${DRAFT_COUNTER++}`, locator: locator, body: "", type
})

/**
 * A shared set of actions for annotations and comments as long as they are similar.
 * Annotations will grow but can still extend from this by reusing the functions.
 *
 * It relies on a gener
 */
export const createNoteActions = (noteApi, type) => (set, get, storeApi) => ({
  deleteNote: async (id) => {
    await noteApi.remove(id)
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
  createDraft: (locator) => {
    set(
      produce((state: NotesState) => {
        state.notes.unshift(createDraftNote(locator, type))
      })
    )
  },
  create: async (note) => {
    const newNote = await noteApi.create(note)
    set(
      produce((state: NotesState) => {
        const index = state.notes.findIndex(item => item.id === note.id)
        state.notes.splice(index, 1, newNote)
      })
    )
  },
  update: async (note) => {
    const updatedNote = await noteApi.update(note)

    set(
      produce((state: NotesState) => {
        console.log('updateNote', state)
        const index = state.notes.findIndex(item => item.id === note.id)
        state.notes.splice(index, 1, updatedNote)
      })
    )
  },
  cancelDraft: (id) => {
    set(
      produce((state: NotesState) => {
        const givenNote = find(state.notes, {id})

        if(givenNote.draft) {
          givenNote.edit = false
          const index = state.notes.findIndex(item => item.id === id)
          state.notes.splice(index, 1)
        }
      })
    )
  },
  cancel: (id) => {
    set(
      produce((state: NotesState) => {
        const givenNote = find(state.notes, {id: id})

        if(!givenNote.draft) {
          givenNote.edit = false
        }else {
          const index = state.notes.findIndex(item => item.id === id)
          state.notes.splice(index, 1)
        }
      })
    )
  },
  fetch: async () => {
    const response = await noteApi.fetch();
    set({notes: response})
  }
})


const createInterviewActions = interviewApi => (set, get, api) => ({
  fetch: async () => {
    const response = await interviewApi.fetch();
    set({notes: response})
  }
})

/**
 * This abstraction is so wrong and a matter of continious refactoring.
 * I'm struggling to solve the issue of providing different apis, actions and components
 * for a pretty similar thing: creating notes.
 *
 * I forced myself to sharply split the responsibilities not to generalize something
 * that is meant to divide over time as annotations will carry much more information than comments.
 */
export const actionFactory = (mode, apiClient, diffId, reviewId) => {
  switch(mode) {
    case DiffMode.COMMENT:
      const commentApi = api.createReviewApi(apiClient, reviewId)
      return createNoteActions(commentApi, NoteType.COMMENT)

    case DiffMode.ANNOTATION:
      const annotationApi = api.createAnnotationApi(apiClient, diffId)
      return createNoteActions(annotationApi, NoteType.ANNOTATION)

    case DiffMode.INTERVIEW:
      const interviewApi = api.createInterviewApi(apiClient, reviewId)
      return createInterviewActions(interviewApi)

    default: throw new Error(`Mode ${mode} is unknown`)
  }
}
