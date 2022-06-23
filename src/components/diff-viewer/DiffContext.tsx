import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useDiffApi } from './use-diff-api';
import { Annotation } from '../notes/BasicNote';
import { Annotation } from '../../types';

const DiffContext = createContext('Default Value');

interface DiffContextData {
  apiConfig: any
  NoteRenderer: any
  diffId: string
  diffData: any
  annotations: any[]
  diffStatus: string,
  dispatchAnnotations: any;
}
export const useDiff = () => useContext<DiffContextData>(DiffContext) as DiffContextData;

let DRAFT_COUNTER = 0

const createDraftAnnotation = (locator): Annotation => ({
  draft: true, id: `draft-${DRAFT_COUNTER++}`, locator: locator, body: "", type: "annotation"
})

const annotationReducer = (state, action) => {
  switch (action.type) {

    case "FETCH_SUCCESS":
      return {
        ...state,
        annotations: action.annotations
      };

    case "ADD_DRAFT":
      return {
        ...state,
        annotations: state.annotations.concat(createDraftAnnotation(action.locator))
      };
    default:
      throw new Error();
  }
}

export const DiffProvider = ({ children, config }) => {
  const initialState = {
    annotations: [],
  };

  const [annotationState, dispatchAnnotations] = useReducer(annotationReducer, initialState);

  const {data, status} = useDiffApi(config)

  useEffect(() => {
    if(status === "fetched") {
      dispatchAnnotations({type: "FETCH_SUCCESS", annotations: data.annotations})
    }
  }, [status]);
  
  const contextValue: DiffContextData = {
    apiConfig: config, 
    NoteRenderer: Annotation,
    diffId: config.diffId,
    diffData: data.markup,
    annotations: annotationState.annotations,
    dispatchAnnotations,
    diffStatus: status
  }
  console.log(annotationState.annotations)
  
  return (
    <DiffContext.Provider value={contextValue}>
      {children}
    </DiffContext.Provider>
  );
};
