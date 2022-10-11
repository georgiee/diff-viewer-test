import create from 'zustand';
import produce from 'immer';
import { Locator, Note, NoteType } from '../../types';

let DRAFT_COUNTER = 0;

const createDraftNote = (locator): Note => ({
  draft: true, id: `draft-${DRAFT_COUNTER++}`, locator: locator, body: "", type: NoteType.ANNOTATION
})


interface CommentState {
  reviewId: null | number,
  drafts: any[];
  mutations: {
    setReviewId: (id: number) => void
    addDraft: (locator: Locator) => void
    removeDraft: (note: Note) => void
  }
}

export const useCommentDrafts = create<CommentState>((set) => ({
  reviewId: null,
  drafts: [],
  mutations: {
    setReviewId: (id) => {
      set(
        produce((state: CommentState) => {
          state.reviewId = id
        })
      )
    },
    removeDraft: (note: Note) => {
      if(!note.draft) {
        return
      }

      set(
        produce((state: CommentState) => {
          const index = state.drafts.findIndex(item => item.id === note.id)
          state.drafts.splice(index, 1)
        })
      )
    },
    addDraft: (locator) => {
      set(
        produce((state: CommentState) => {
          state.drafts.unshift(createDraftNote(locator))
        })
      )
      
      return null
    },
  }
}))
