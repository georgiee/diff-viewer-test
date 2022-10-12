import React, { createContext, FunctionComponent, ReactElement, useContext, useEffect, useState } from 'react';
import { DiffMode, Locator } from '../types';
import { createDiffApi } from '../api';
import { NoteComponentInterface } from './shared';

const DiffContext = createContext('Default Value');

interface DiffContextData {
  readonly: boolean
  diffId: string
  diffData: any
  status: string,
  mode: string,
  LineRenderer: FunctionComponent<NoteComponentInterface> | null
}
export const useDiff = () => useContext<DiffContextData>(DiffContext as any) as DiffContextData;

interface DiffProviderProps {
  children: React.ReactElement[]
  mode: string
  apiClient: any
  diffId: string
  lineRenderer: FunctionComponent<NoteComponentInterface> | null
}
export const DiffProvider = ({ children, mode, apiClient, diffId, lineRenderer = null }: DiffProviderProps) => {
  const api = createDiffApi(apiClient, diffId)
  
  const [status, setStatus] = useState('idle');
  const [markup, setMarkup] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      setStatus('fetching');
      const markup = await api.getDiff();
      setMarkup(markup);
      setStatus('fetched');
    };

    fetchData();
  }, [diffId]);


  const contextValue: DiffContextData = {
    LineRenderer: lineRenderer,
    diffId,
    mode,
    diffData: markup,
    status,
    readonly: mode === DiffMode.INTERVIEW
  }
  
  return (
    <DiffContext.Provider value={contextValue as any}>
      {children}
    </DiffContext.Provider>
  )

};
