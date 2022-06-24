import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { annotationReducer, initialState } from './annotationReducer';
import { Annotation as AnnotationComponent } from '../notes/Annotation';
import { useDiff } from './DiffContext';

const AnnotationContext = createContext();

interface AnnotationContextData {
  NoteRenderer: any
  items: any[]
  dispatch: any;
}

export const useAnnotation = () => useContext<AnnotationContextData>(AnnotationContext) as AnnotationContextData;

interface AnnotationProviderProps {
  children?: string | React.ReactNode;
}

export const AnnotationProvider = ({ children }: AnnotationProviderProps) => {
  const { api} = useDiff();
  const [state, dispatch] = useReducer(annotationReducer, initialState);
  
  useEffect(() => {
    const fetchData = async () => {
      const annotations = await api.getAnnotations();
      dispatch({type: "FETCH_SUCCESS", annotations: annotations})
    };

    fetchData();
  }, []);

  
  const contextValue: AnnotationContextData = {
    NoteRenderer: AnnotationComponent,
    items: state,
    dispatch
  }

  return (
    <AnnotationContext.Provider value={contextValue}>
      {children}
    </AnnotationContext.Provider>
  );
};
