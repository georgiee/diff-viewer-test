import React, { useMemo } from 'react';
import { Note, NoteType } from '../../../types';
import { locatorEqual } from '../../../utils/utils';
import { GutterComponentInterface } from '../../../diff-viewer/shared';
import styled, { css } from 'styled-components';
import { useCommentDrafts } from '../stores/drafts';
import { useComments } from '../hooks/useComments';

export const LineContentMarker = styled.div`
  aspect-ratio: 1;
  width: 10px;
  
  margin: 2px;
  box-sizing: border-box;

  ${({noteType}) => noteType == NoteType.COMMENT && css`background: #FFDB58`}
  ${({noteType}) => noteType == NoteType.ANNOTATION && css`background: #85b9ff`}
`


export function CommentGutterRenderer(data: GutterComponentInterface) {

  const reviewId = useCommentDrafts(state => state.reviewId);

  const {commentsQuery} = useComments(reviewId);

  const drafts = useCommentDrafts(state => state.drafts);


  const comments = drafts.concat(commentsQuery.data ?? [])
  const matchingNotes = useMemo(() => comments.filter(note => locatorEqual(note.locator, data.locator)) || [], [commentsQuery.data, drafts]);
  
  return matchingNotes.map((note: Note) => (
    <LineContentMarker key={note.id} noteType={note.type}/>
  )) as any;
}
