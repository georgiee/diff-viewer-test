import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { createDiffApi, useDiffApi } from '../diff-viewer/use-diff-api';
import { annotationReducer, initialState } from '../diff-viewer/reducer';
import { ClientConfiguration, DiffMode } from '../../types';
import { Annotation as AnnotationComponent } from '../notes/Annotation';

const DiffContext = createContext('Default Value');

interface DiffContextData {
  mode: DiffMode;
  NoteRenderer: any
  diffId: string
  diffData: any
  items: any[]
  status: string,
  dispatch: any;
}
export const useDiff = () => useContext<DiffContextData>(DiffContext) as DiffContextData;

interface DiffProviderProps {
  children: string | React.ReactNode;
  config: ClientConfiguration
}

export const DiffProvider = ({ children, config }: DiffProviderProps) => {
  const [annotationState, dispatch] = useReducer(annotationReducer, initialState);

  const {data, status} = useDiffApi(config)

  useEffect(() => {
    if(status === "fetched") {
      dispatch({type: "FETCH_SUCCESS", annotations: data.annotations})
    }
  }, [status]);
  
  const contextValue: DiffContextData = {
    mode: config.mode,
    NoteRenderer: AnnotationComponent,
    diffId: config.diffId,
    diffData: data.markup,
    items: annotationState,
    dispatch,
    status
  }
  
  return (
    <DiffContext.Provider value={contextValue}>
      {children}
    </DiffContext.Provider>
  );
};
