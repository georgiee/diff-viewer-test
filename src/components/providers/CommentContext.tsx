import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { initialState, noteReducer } from './NoteReducer';
import { Comment as CommentComponent } from '../notes/Comment';
import { useDiff } from './DiffContext';
import { createReviewApi } from '../../api';

const CommentContext = createContext();

interface CommentContextData {
  NoteRenderer: any
  items: any[]
  dispatch: any;
  api: any;
}

export const useComment = () => useContext<CommentContextData>(CommentContext) as CommentContextData;


interface AnnotationProviderProps {
  children?: string | React.ReactNode;
  reviewId?: string;
}

export const CommentProvider = ({ children, reviewId }: AnnotationProviderProps) => {
  if(!reviewId) {
    return null;
  }
  
  const { apiClient } = useDiff();
  const api = createReviewApi(apiClient, reviewId)

  const [state, dispatch] = useReducer(noteReducer, initialState);
  
  useEffect(() => {
    const fetchData = async () => {
      const comments = await api.getComments();
      dispatch({type: "FETCH_SUCCESS", notes: comments})
    };

    fetchData();
  }, []);

  
  const contextValue: CommentContextData = {
    NoteRenderer: CommentComponent,
    items: state,
    dispatch,
    api
  }

  return (
    <CommentContext.Provider value={contextValue}>
      {children}
    </CommentContext.Provider>
  );
};
