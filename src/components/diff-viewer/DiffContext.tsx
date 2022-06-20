import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { ApiClientConfig } from './types';
import { useDiffApi } from './use-diff-api';
import { BasicNote } from '../notes/BasicNote';

const DiffContext = createContext('Default Value');

export const useDiff = () => useContext(DiffContext);

const createApiClient = ({base, token}) => axios.create({
  baseURL: base,
  timeout: 1000,
  headers: {'Authorization': 'Bearer '+ token}
});

export const createDiffClient = (config: ApiClientConfig) => {
  return createApiClient({base: config.apiBaseUrl, token: config.token });
}


export const DiffProvider = ({ children, config }) => {
  const {data, status} = useDiffApi(config)
  
  const contextValue = {
    apiConfig: config,
    NoteRenderer: BasicNote,
    diffId: config.diffId,
    diffData: data,
    diffStatus: status
  }
  
  return (
    <DiffContext.Provider value={contextValue}>
      {children}
    </DiffContext.Provider>
  );
};
