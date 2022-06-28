import React, { createContext, useContext, useEffect, useState } from 'react';
import { createDiffApi } from '../../api';

const DiffContext = createContext('Default Value');

interface DiffContextData {
  diffId: string
  diffData: any
  status: string,
  mode: string
}
export const useDiff = () => useContext<DiffContextData>(DiffContext as any) as DiffContextData;

export const DiffProvider = ({ children, mode, apiClient, diffId }) => {
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
    diffId,
    mode,
    diffData: markup,
    status
  }
  
  return (
    <DiffContext.Provider value={contextValue as any}>
      {children}
    </DiffContext.Provider>
  )

};
