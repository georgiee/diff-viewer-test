import React from 'react';
import { Note } from '../../../types';
import { locatorEqual } from '../../../utils/utils';
import { NoteComponentInterface } from '../../../diff-viewer/shared';
import { NoteComponent } from './NoteComponent';
import { useInterview } from '../hooks/useInterview';
import { useInterviewStore } from '../stores/interview';

export function InterviewLineRenderer(data: NoteComponentInterface) {
  const reviewId = useInterviewStore(store => store.reviewId)
  const {commentsQuery, useIsVisibleAtom} = useInterview(reviewId);

  const [visible] = useIsVisibleAtom
  const notes = commentsQuery.data ?? []
  const matchingNotes = notes.filter(note => locatorEqual(note.locator, data.locator))

  if(!visible){
    return
  }
  return matchingNotes.map((note: Note) => (
    <NoteComponent key={note.id} note={note}/>
  ))
}
