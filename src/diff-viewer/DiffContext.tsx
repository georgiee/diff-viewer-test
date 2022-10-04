import React, { createContext, useContext, useEffect, useState } from 'react';
import { DiffMode, Locator } from '../types';
import { createDiffApi } from '../api';

const DiffContext = createContext('Default Value');

interface DiffContextData {
  readonly: boolean
  diffId: string
  diffData: any
  status: string,
  mode: string,
  LineRenderer: React.FC<{ locator: Locator, addDraftFnRef: React.Ref<Function> }> | null | undefined
}
export const useDiff = () => useContext<DiffContextData>(DiffContext as any) as DiffContextData;

export const DiffProvider = ({ children, mode, apiClient, diffId, lineRenderer = null }) => {
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
