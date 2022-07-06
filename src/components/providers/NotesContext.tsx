import React, { useEffect } from 'react';
import create, { StoreApi } from 'zustand'
import createZustandContext from 'zustand/context'
import { actionFactory } from '../../store/note-actions';
import { Locator, Note } from '../../types';

const context = createZustandContext<StoreApi<State>>()
export const useStore = context.useStore;

export interface NotesMutations {
  addDraft: (locator: Locator) => void
  edit: (id: string) => void
  cancel: (id: string) => void
  fetch:  () => Promise<void>,
  create: (note: Note) => Promise<void>,
  update: (note: Note) => Promise<void>,
  delete: (id: string) => Promise<void>,
}

export interface State {
  mode: string;
  notes: any[];
  mutations: NotesMutations
}

const InitalizeStore = () => {
  const fetch = useStore((state) => state.mutations.fetch);

  useEffect(() => {
    fetch()

  }, [])

  return null;
}

export const NotesProvider = ({ children, apiClient, diffId, reviewId, mode }) => {
  const createActions = actionFactory(mode, apiClient, diffId, reviewId);
  
  const createStore = () => create<State>((set) => ({
    mode: mode,
    notes: [],
    mutations: createActions(set)
  }))
  
  return (
    <context.Provider createStore={createStore}>
      <InitalizeStore/>
      {children}
    </context.Provider>
  );
};
