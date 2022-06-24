import React, { createContext, useContext, useEffect, useState } from 'react';
import { ClientConfiguration, DiffMode } from '../../types';
import { AnnotationProvider, useAnnotation } from './AnnotationContext';
import { CommentProvider, useComment } from './CommentContext';
import { createApiClient, createDiffApi } from '../../api';

const DiffContext = createContext('Default Value');

interface DiffContextData {
  mode: DiffMode;
  token: string;
  apiClient: any;
  diffId: string
  diffData: any
  status: string,
  useNote: Function,
  api: any;
}
export const useDiff = () => useContext<DiffContextData>(DiffContext) as DiffContextData;

interface DiffProviderProps {
  children?: string | React.ReactNode;
  reviewId?: string;
  config: ClientConfiguration
}

export const DiffProvider = ({ children, config, reviewId }: DiffProviderProps) => {
  const apiClient = createApiClient({base: config.apiBaseUrl, token: config.token });
  const api = createDiffApi(apiClient, config.diffId)
  const mode = config.mode
  
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

  let useNote: any = null;
  if(mode == DiffMode.ANNOTATION) {
    useNote = useAnnotation
  }else {
    useNote = useComment
  }
  
  const contextValue: DiffContextData = {
    api,
    apiClient,
    mode: config.mode,
    token: config.token,
    diffId: config.diffId,
    diffData: markup,
    useNote,
    status
  }
  
  if(mode == DiffMode.ANNOTATION) {
    return (
      <DiffContext.Provider value={contextValue}>
        <AnnotationProvider>
          {children}
        </AnnotationProvider>
      </DiffContext.Provider>
    )
  }else {
    
    return (
      <DiffContext.Provider value={contextValue}>
        <CommentProvider reviewId={reviewId}>
          {children}
        </CommentProvider>
      </DiffContext.Provider>
    )
  }

};
