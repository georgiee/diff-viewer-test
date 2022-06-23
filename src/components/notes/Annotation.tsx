import React, { useCallback } from 'react';
import { Annotation as AnnotationType } from '../../types';
import { Note } from './Note';
import { useDiff } from '../diff-viewer/DiffContext';

const locatorEqual = (a, b) => {
  if(!a || !b) return false;

  return a[0] === b[0] &&
    a[1] === b[1] &&
    a[2] === b[2] &&
    a[3] === b[3]
}

const getAnnotationKey = (commentLike: AnnotationType) => {
  return commentLike.id;
}

const getAnnotationsFor = (annotations, locator): AnnotationType[] => {
  return annotations.filter(note => locatorEqual(note.locator, locator))
}

export const Annotation = ({locator, annotations}) => {
  const myAnnotations = getAnnotationsFor(annotations, locator);
  const { api, dispatchAnnotations } = useDiff();

  const onSaveDraft = async (note) => {
    const newNote = await api.createAnnotation(note)
    dispatchAnnotations({type: "DELETE_DRAFT", id: note.id});
    dispatchAnnotations({type: "ADD_ANNOTATION", annotation: newNote});
  }

  const onDeleteDraft = async (note) => {
    dispatchAnnotations({type: "DELETE_DRAFT", id: note.id});
  }
  const onDeleteAnnotation = async (note) => {
    await api.deleteAnnotation(note)
    dispatchAnnotations({type: "DELETE_ANNOTATION", id: note.id});
  }

  const onSaveAnnotation = async (note) => {
    const newNote = await api.updateAnnotation(note)
    dispatchAnnotations({type: "UPDATE_ANNOTATION", annotation: newNote});
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
