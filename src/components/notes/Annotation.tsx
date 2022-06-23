import React, { useReducer } from 'react';
import { Annotation } from '../../types';
import { Note } from './Note';

const locatorEqual = (a, b) => {
  if(!a || !b) return false;

  return a[0] === b[0] &&
    a[1] === b[1] &&
    a[2] === b[2] &&
    a[3] === b[3]
}

const getAnnotationKey = (commentLike: Annotation) => {
  return commentLike.id;
}

const getAnnotationsFor = (annotations, locator): Annotation[] => {
  return annotations.filter(note => locatorEqual(note.locator, locator))
}

export const Annotation = ({locator, annotations}) => {
  const myAnnotations = getAnnotationsFor(annotations, locator);
  
  if(myAnnotations.length === 0) {
    return null;
  }
  console.log('myAnnotations', myAnnotations)
  return myAnnotations.map(annotation => <Note
    note={annotation}
    onSaveDraft={(note) => console.log('go save draft')}
    onCancelDraft={(note) => console.log('go cancel draft')}
    key={getAnnotationKey(annotation)}/>)    
  
}
