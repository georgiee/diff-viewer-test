import React, { useEffect, useMemo } from 'react';
import { useComments } from './hooks/useComments';
import { useCommentDrafts } from './stores/drafts';
import { Comment, Note } from '../types';
import { locatorEqual } from '../utils/utils';
import { NoteComponentInterface } from '../diff-viewer/shared';
import { NoteComponent } from './NoteComponent';

export function CommentNote(data: NoteComponentInterface) {
  
  const reviewId = useCommentDrafts(state => state.reviewId);

  const {commentsQuery, newComment, updateComment, deleteComment} = useComments(reviewId);

  const drafts = useCommentDrafts(state => state.drafts);
  const draftMutations = useCommentDrafts(state => state.mutations);

  useEffect(() => {
    data.addDraftFnRef.current = (locator) => draftMutations.addDraft(locator)
  }, [draftMutations]);
  

  const comments = drafts.concat(commentsQuery.data ?? [])
  const matchingNotes = useMemo(() => comments.filter(note => locatorEqual(note.locator, data.locator)) || [], [commentsQuery.data, drafts]);

  return matchingNotes.map((note: Note) => (
    <NoteComponent
      key={note.id}
      note={note}
      onCancel={() => {draftMutations.removeDraft(note)}}
      onSave={(newNote: Comment) => {
        if(newNote.draft) {
          newComment.mutate({ body: newNote.body, locator: newNote.locator },  {
            onSuccess: () => draftMutations.removeDraft(newNote)
          })
        }else {
          updateComment.mutate({ id: newNote.id, note: newNote })
        }
      }}
      onDelete={() => deleteComment.mutate({ id: note.id })}/>
  ))
}
