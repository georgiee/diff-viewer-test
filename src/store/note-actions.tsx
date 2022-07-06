import { NotesMutations, State } from '../components/providers/NotesContext';
import produce from "immer"
import { find, findIndex } from 'lodash';
import { DiffMode, Locator, Note, NoteType } from '../types';
import * as api from '../api';

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
const createNoteActions = (noteApi, type) => (set): NotesMutations => {
  return {
    fetch: async () => {
      const response = await noteApi.fetch();
      set({notes: response})
    },
  
    addDraft: (locator) => {
      set(
        produce((state: State) => {
          state.notes.unshift(createDraftNote(locator, type))
        })
      )
    },
    edit: (id) => {
      set(
        produce((state: State) => {
          const note = find(state.notes, {id})
          note.edit = true
        })
      )
    },
    cancel: (id) => {
      set(
        produce((state: State) => {
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
    create: async (note) => {
      const newNote = await noteApi.create(note)
      set(
        produce((state: State) => {
          const index = state.notes.findIndex(item => item.id === note.id)
          state.notes.splice(index, 1, newNote)
        })
      )
    },
    update: async (note) => {
      const updatedNote = await noteApi.update(note)
  
      set(
        produce((state: State) => {
          console.log('updateNote', state)
          const index = state.notes.findIndex(item => item.id === note.id)
          state.notes.splice(index, 1, updatedNote)
        })
      )
    },
    delete: async (id) => {
      const yes = confirm("Are you sure to delete it?");
  
      if(!yes) {
        return;
      }
  
      await noteApi.remove(id)
      set(
        produce((state: State) => {
          const index = findIndex(state.notes, { id });
          state.notes.splice(index, 1)
        })
      )
    }
  }
}

const createInterviewActions = interviewApi => (set): NotesMutations => ({
  fetch: async () => {
    const response = await interviewApi.fetch();
    set({notes: response})
  },
  addDraft: (locator: Locator) => {
    throw new Error("not implemented")
  },
  edit: (id: string) => {
    throw new Error("not implemented")
  },
  cancel: (id: string) => {
    throw new Error("not implemented")
  },
  create: async (note: Note) => {
    throw new Error("not implemented")
  },
  update: async (note: Note) => {
    throw new Error("not implemented")
  },
  delete: async (id: string) => {
    throw new Error("not implemented")
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
export const actionFactory = (mode, apiClient, diffId, reviewId): (set: any) => NotesMutations => {
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
