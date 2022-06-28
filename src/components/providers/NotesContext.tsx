import React, { createContext, useContext, useEffect } from 'react';
import create from 'zustand'
import createZustandContext from 'zustand/context'
import { createDiffApi, createInterviewApi, createReviewApi } from '../../api';
import { DiffMode, Note } from '../../types';
import produce from "immer"
import {findIndex, find} from 'lodash';

const NotesContext = createContext<any>(null);

interface NotesContextData {
  items: any[]
}

export const useNotes = () => useContext<NotesContextData>(NotesContext) as NotesContextData;
const { Provider, useStore: useZustandStore } = createZustandContext()
export const useStore = useZustandStore;

let DRAFT_COUNTER = 0;
const createDraftNote = (locator): Note => ({
  draft: true, id: `draft-${DRAFT_COUNTER++}`, locator: locator, body: "", type: "annotation"
})

interface State {
  notes: any[]
}

const createAnnotationActions = annotationApi => (set, get, api) => ({
  cancelEdit: (id) => {
    set(
      produce((state: State) => {
        const note = find(state.notes, {id})
        note.edit = false
      })
    )
  },
  deleteNote: async (id) => {
    await annotationApi.deleteAnnotation(id)
    set(
      produce((state: State) => {
        const index = findIndex(state.notes, { id });
        state.notes.splice(index, 1)
      })
    )
  },
  editNote: (id) => {
    set(
      produce((state: State) => {
        const note = find(state.notes, {id})
        note.edit = true
      })
    )
  },
  updateNote: async (note) => {
    const updatedNote = await annotationApi.updateAnnotation(note)

    set(
      produce((state: State) => {
        console.log('updateNote', state)
        const index = state.notes.findIndex(item => item.id === note.id)
        state.notes.splice(index, 1, updatedNote)
      })
    )
  },
  createDraft: (locator) => {
    set(
      produce((state: State) => {
        state.notes.unshift(createDraftNote(locator))
      })
    )
  },
  saveDraft: async (note) => {
    const newNote = await annotationApi.createAnnotation(note)
    set(
      produce((state: State) => {
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
      produce((state: State) => {
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


const createCommentActions = commentApi => (set, get, api) => ({
  fetch: async () => {
    const response = await commentApi.fetch();
    set({notes: response})
  }
})


const createInterviewActions = interviewApi => (set, get, api) => ({
  fetch: async () => {
    const response = await interviewApi.fetch();
    set({notes: response})
  }
})

export const NotesProvider = ({ children, apiClient, diffId, reviewId, mode }) => {
  const actionFactory = mode =>  (set, get, api) => {
    switch(mode) {
      case DiffMode.COMMENT:
        const commentApi = createReviewApi(apiClient, reviewId)
        return createCommentActions(commentApi)(set, get, api);
      case DiffMode.ANNOTATION:
        const annotationApi = createDiffApi(apiClient, diffId)
        return createAnnotationActions(annotationApi)(set, get, api);
      case DiffMode.INTERVIEW:
        const interviewApi = createInterviewApi(apiClient, reviewId)
        return createInterviewActions(interviewApi)(set, get, api);
      default: throw new Error(`Mode ${mode} is unknown`)
    }
  }
  
  const createActions = actionFactory(mode);
  
  const createStore = () => create((set, get, api) => ({
    mode: mode,
    notes: [],
    ...createActions(set, get, api)
  }))
  
  const contextValue: NotesContextData = {
    items: []
  }

  return (
    <Provider createStore={createStore}>
      <NotesContext.Provider value={contextValue}>
        {children}
      </NotesContext.Provider>
    </Provider>
  );
};
