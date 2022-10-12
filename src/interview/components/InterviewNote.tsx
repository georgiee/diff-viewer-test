import React from 'react';
import { Note } from '../../types';
import { locatorEqual } from '../../utils/utils';
import { NoteComponentInterface } from '../../diff-viewer/shared';
import { NoteComponent } from './NoteComponent';
import { useInterview } from '../hooks/useInterview';
import { useInterviewStore } from '../stores/interview';

export function InterviewNote(data: NoteComponentInterface) {
  const reviewId = useInterviewStore(store => store.reviewId)
  const {commentsQuery} = useInterview(reviewId);

  const notes = commentsQuery.data ?? []
  const matchingNotes = notes.filter(note => locatorEqual(note.locator, data.locator))

  return matchingNotes.map((note: Note) => (
    <NoteComponent key={note.id} note={note}/>
  ))
}
