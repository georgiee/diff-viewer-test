import React, { createContext, useContext, useEffect } from 'react';
import create from 'zustand'
import createZustandContext from 'zustand/context'
import { createDiffApi, createInterviewApi, createReviewApi } from '../../api';
import { DiffMode, Note } from '../../types';
import { createNoteActions } from './note-actions';

const NotesContext = createContext<any>(null);

interface NotesContextData {
  items: any[]
}

export const useNotes = () => useContext<NotesContextData>(NotesContext) as NotesContextData;
const { Provider, useStore: useZustandStore } = createZustandContext()
export const useStore = useZustandStore;


export interface NotesState {
  notes: any[]
}



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
        return createNoteActions(commentApi)(set, get, api);
      case DiffMode.ANNOTATION:
        const annotationApi = createDiffApi(apiClient, diffId)
        return createNoteActions(annotationApi)(set, get, api);
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
