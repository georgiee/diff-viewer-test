import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { createDiffApi, useDiffApi } from './use-diff-api';
import { Annotation as AnnotationComponent } from '../notes/Annotation';
import { annotationReducer, initialState } from './reducer';

const DiffContext = createContext('Default Value');

interface DiffContextData {
  api: any
  apiConfig: any
  NoteRenderer: any
  diffId: string
  diffData: any
  annotations: any[]
  diffStatus: string,
  dispatchAnnotations: any;
}
export const useDiff = () => useContext<DiffContextData>(DiffContext) as DiffContextData;


export const DiffProvider = ({ children, config }) => {
  const api = createDiffApi(config)
  

  const [annotationState, dispatchAnnotations] = useReducer(annotationReducer, initialState);

  const {data, status} = useDiffApi(config)

  useEffect(() => {
    if(status === "fetched") {
      dispatchAnnotations({type: "FETCH_SUCCESS", annotations: data.annotations})
    }
  }, [status]);
  
  const contextValue: DiffContextData = {
    api,
    apiConfig: config, 
    NoteRenderer: AnnotationComponent,
    diffId: config.diffId,
    diffData: data.markup,
    annotations: annotationState,
    dispatchAnnotations,
    diffStatus: status
  }
  
  return (
    <DiffContext.Provider value={contextValue}>
      {children}
    </DiffContext.Provider>
  );
};
