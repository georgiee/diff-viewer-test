import React from 'react';
import { Note as NoteType } from '../../types';
import { Note } from './Note';
import { useDiff } from '../providers/DiffContext';
import { useAnnotation } from '../providers/AnnotationContext';

const locatorEqual = (a, b) => {
  if(!a || !b) return false;

  return a[0] === b[0] &&
    a[1] === b[1] &&
    a[2] === b[2] &&
    a[3] === b[3]
}

const getAnnotationKey = (commentLike: NoteType) => {
  return commentLike.id;
}

const getAnnotationsFor = (annotations, locator): NoteType[] => {
  return annotations.filter(note => locatorEqual(note.locator, locator))
}

export const Annotation = ({locator, items}) => {
  const myAnnotations = getAnnotationsFor(items, locator);

  const { api } = useDiff();
  const {dispatch} = useAnnotation()

  const onSaveDraft = async (note) => {
    const newNote = await api.createAnnotation(note)
    dispatch({type: "DELETE_DRAFT", id: note.id});
    dispatch({type: "ADD_ANNOTATION", annotation: newNote});
  }

  const onDeleteDraft = async (note) => {
    dispatch({type: "DELETE_DRAFT", id: note.id});
  }
  
  const onDeleteAnnotation = async (note) => {
    await api.deleteAnnotation(note)
    dispatch({type: "DELETE_ANNOTATION", id: note.id});
  }

  const onSaveAnnotation = async (note) => {
    const newNote = await api.updateAnnotation(note)
    dispatch({type: "UPDATE_ANNOTATION", annotation: newNote});
  }
  
  if(myAnnotations.length === 0) {
    return null;
  }

  return myAnnotations.map(annotation => <Note
    note={annotation}
    onSaveAnnotation={(note) => onSaveAnnotation(note) }
    onDeleteAnnotation={(note) => onDeleteAnnotation(note) }
    onSaveDraft={(note) => onSaveDraft(note) }
    onCancelDraft={(note) => onDeleteDraft(note)}
    key={getAnnotationKey(annotation)}/>)    
  
}
