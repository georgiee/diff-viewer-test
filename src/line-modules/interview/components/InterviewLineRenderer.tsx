import React from 'react';
import { Note } from '../../../types';
import { locatorEqual } from '../../../utils/utils';
import { NoteComponentInterface } from '../../../diff-viewer/shared';
import { NoteComponent } from './NoteComponent';
import { hiddenNotesIdsAtom, isVisibleAtom, useInterview } from '../hooks/useInterview';
import { useInterviewStore } from '../stores/interview';
import { useAtomValue } from 'jotai';
import { notesConfigurationAtom, visibleNoteAtoms } from '../atoms';

export function InterviewLineRenderer(data: NoteComponentInterface) {
  const reviewId = useInterviewStore(store => store.reviewId)
  const {commentsQuery} = useInterview(reviewId);

  const visible = useAtomValue(isVisibleAtom)
  const notesVisible = useAtomValue(notesConfigurationAtom)
  const notes = commentsQuery.data ?? []

  const matchingNotes = notes
      .filter(note => locatorEqual(note.locator, data.locator))
      .filter(note => !notesVisible[note.id])

  
  return matchingNotes.map((note: Note) => (
    <NoteComponent key={note.id} note={note}/>
  ))
}
