import React, { createContext, useContext, useEffect, useState } from 'react';
import { createDiffApi } from '../diff-viewer/use-diff-api';
import { ClientConfiguration, DiffMode } from '../../types';

const DiffContext = createContext('Default Value');

interface DiffContextData {
  mode: DiffMode;
  token: string;
  diffId: string
  diffData: any
  status: string,
  api: any;
}
export const useDiff = () => useContext<DiffContextData>(DiffContext) as DiffContextData;

interface DiffProviderProps {
  children?: string | React.ReactNode;
  config: ClientConfiguration
}
 
export const DiffProvider = ({ children, config }: DiffProviderProps) => {
  const api = createDiffApi(config)

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
  }, [config.diffId]);
  
  const contextValue: DiffContextData = {
    api,
    mode: config.mode,
    token: config.token,
    diffId: config.diffId,
    diffData: markup,
    status
  }
  
  return (
    <DiffContext.Provider value={contextValue}>
      {children}
    </DiffContext.Provider>
  );
};
