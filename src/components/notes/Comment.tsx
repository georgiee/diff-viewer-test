import React from 'react';
import { Note as NoteType } from '../../types';
import { Note } from './Note';
import { useDiff } from '../providers/DiffContext';
import { useComment } from '../providers/CommentContext';
import { createReviewApi } from '../../api';

const locatorEqual = (a, b) => {
  if(!a || !b) return false;

  return a[0] === b[0] &&
    a[1] === b[1] &&
    a[2] === b[2] &&
    a[3] === b[3]
}

const getKey = (commentLike: NoteType) => {
  return commentLike.id;
}

const getItemsFor = (items, locator): NoteType[] => {
  return items.filter(note => locatorEqual(note.locator, locator))
}

export const Comment = ({locator}) => {
  const { dispatch, items, api } = useComment();
  const myItems = getItemsFor(items, locator);

  if(myItems.length === 0) {
    return null;
  }

  const onSaveDraft = async (note) => {
    const newNote = await api.createComment(note)
    dispatch({type: "DELETE_DRAFT_NOTE", id: note.id});
    dispatch({type: "ADD_NOTE", note: newNote});
  }

  const onDeleteDraft = async (note) => {
    dispatch({type: "DELETE_DRAFT_NOTE", id: note.id});
  }

  const onDeleteAnnotation = async (note) => {
    await api.delete(note)
    dispatch({type: "DELETE_NOTE", id: note.id});
  }

  const onSaveAnnotation = async (note) => {
    const newNote = await api.updateComment(note)
    dispatch({type: "UPDATE_NOTE", note: newNote});
  }

  if(myItems.length === 0) {
    return null;
  }
  
  return myItems.map(annotation => <Note
    note={annotation}
    onSaveAnnotation={(note) => onSaveAnnotation(note) }
    onDeleteAnnotation={(note) => onDeleteAnnotation(note) }
    onSaveDraft={(note) => onSaveDraft(note) }
    onCancelDraft={(note) => onDeleteDraft(note)}
    key={getKey(annotation)}/>)

}
