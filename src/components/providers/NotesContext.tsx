import React, { createContext } from 'react';
import create from 'zustand'
import createZustandContext from 'zustand/context'
import { DiffMode, NoteType } from '../../types';
import { actionFactory, createNoteActions } from './note-actions';

import * as api from '../../api';

const NotesContext = createContext<any>(null);

interface NotesContextData {
  items: any[]
}

const { Provider, useStore: useZustandStore } = createZustandContext()
export const useStore = useZustandStore;


export interface NotesState {
  notes: any[]
}


export const NotesProvider = ({ children, apiClient, diffId, reviewId, mode }) => {
  /**
   * generate a specific set of actions for the given mode being annotate, review or interview
   */
  const createActions = actionFactory(mode, apiClient, diffId, reviewId);
  
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
