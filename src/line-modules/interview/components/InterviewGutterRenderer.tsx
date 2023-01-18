import React from 'react';
import { Note, NoteType } from '../../../types';
import { locatorEqual } from '../../../utils/utils';
import { GutterComponentInterface } from '../../../diff-viewer/shared';
import { NoteComponent } from './NoteComponent';
import { useInterview } from '../hooks/useInterview';
import { useInterviewStore } from '../stores/interview';
import styled, { css } from 'styled-components';

interface GutterContentProps {
  note: Note
}

export const LineContentMarker = styled.div`
  aspect-ratio: 1;
  width: 10px;
  
  margin: 2px;
  box-sizing: border-box;

  ${({noteType}) => noteType == NoteType.COMMENT && css`background: #FFDB58`}
  ${({noteType}) => noteType == NoteType.ANNOTATION && css`background: #85b9ff`}
`


export function InterviewGutterRenderer(data: GutterComponentInterface) {
  const reviewId = useInterviewStore(store => store.reviewId)
  const {commentsQuery} = useInterview(reviewId);

  const notes = commentsQuery.data ?? []
  const matchingNotes = notes.filter(note => locatorEqual(note.locator, data.locator))

  return matchingNotes.map((note: Note) => (
    <LineContentMarker key={note.id} noteType={note.type}/>
  ))
}
