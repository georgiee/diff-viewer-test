import React, { createContext, useContext, useEffect } from 'react';
import create from 'zustand'
import createZustandContext from 'zustand/context'
import { createDiffApi, createReviewApi } from '../../api';
import { DiffMode, Note } from '../../types';
import produce from "immer"

const NotesContext = createContext();

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

export const NotesProvider = ({ children, apiClient, diffId, reviewId, mode }) => {
  const annotationApi = createDiffApi(apiClient, diffId)
  const commentApi = createReviewApi(apiClient, reviewId)
  
  // TODO: Create a store for each environment to not involve conditions
  const createStore = () => create((set) => ({
    mode: mode,
    notes: [],
    editNote: (id) => {
      console.log('editNote', id)

      set(
        produce((state) => {
          const note = state.notes.find(item => item.id === id)
          console.log('find note', id, note)
          note.edit = true;
        })
      )
    },
    updateNote: async (note) => {
      const updatedNote = await annotationApi.updateAnnotation(note)
      set(
        produce((state) => {
          const index = state.notes.findIndex(item => item.id === note.id)
          state.notes.splice(index, 1, updatedNote)
        })
      )
    },
    createDraft: (locator) => {
      set(
        produce((state) => {
          state.notes.unshift(createDraftNote(locator))
        })
      )
    },
    saveDraft: async (note) => {
      const newNote = await annotationApi.createAnnotation(note)
      set(
        produce((state) => {
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
        produce((state) => {
          const index = state.notes.findIndex(item => item.id === note.id)
          state.notes.splice(index, 1)
        })
      )
    },
    fetch: async () => {
      if(mode === DiffMode.COMMENT) {
        const response = await commentApi.getComments();
        set({notes: response})
      }
      
      if(mode === DiffMode.ANNOTATION) {
        const response = await annotationApi.getAnnotations();
        set({notes: response})
      }
      
      if(mode === DiffMode.INTERVIEW) {
        const response = await apiClient.get(`/interview/${reviewId}`)
        set({notes: response.data})
      }
    }
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
