import React, { useEffect, useMemo } from 'react';
import { Note, NoteType } from '../../../types';
import { locatorEqual } from '../../../utils/utils';
import { GutterComponentInterface } from '../../../diff-viewer/shared';
import styled, { css } from 'styled-components';
import { useCommentDrafts } from '../stores/drafts';
import { useComments } from '../hooks/useComments';
import { useDiff } from '../../../diff-viewer/DiffContext';
import { useAnnotations } from '../hooks/useAnnotations';
import { useAnnotationDrafts } from '../stores/note-drafts';

export const LineContentMarker = styled.div`
  aspect-ratio: 1;
  width: 10px;
  
  margin: 2px;
  box-sizing: border-box;

  ${({noteType}) => noteType == NoteType.COMMENT && css`background: #FFDB58`}
  ${({noteType}) => noteType == NoteType.ANNOTATION && css`background: #85b9ff`}
`


export function AnnotationGutterRenderer(data: GutterComponentInterface) {
  const {diffId} = useDiff();

  const {annotationsQuery } = useAnnotations(diffId)

  const drafts = useAnnotationDrafts(state => state.drafts);


  const notes = drafts.concat(annotationsQuery.data ?? [])
  const matchingNotes = useMemo(() => notes.filter(note => locatorEqual(note.locator, data.locator)) || [], [annotationsQuery.data, drafts]);

  return matchingNotes.map((note: Note) => (
    <LineContentMarker key={note.id} noteType={note.type}/>
  )) as any;
}
