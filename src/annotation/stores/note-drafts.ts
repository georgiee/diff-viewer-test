import { Locator, Note, NoteType } from '../../types';
import create from 'zustand';
import produce from 'immer';

let DRAFT_COUNTER = 0;

const createDraftNote = (locator): Note => ({
  draft: true, id: `draft-${DRAFT_COUNTER++}`, locator: locator, body: "", type: NoteType.ANNOTATION
})


export interface AnnotationDraftState {
  drafts: any[];
  mutations: {
    addDraft: (locator: Locator) => void
    removeDraft: (note: Note) => void
  }
}

export const useAnnotationDrafts = create<AnnotationDraftState>((set) => ({
  drafts: [],
  mutations: {
    removeDraft: (note: Note) => {
      if(!note.draft) {
        return
      }
      
      set(
        produce((state: AnnotationDraftState) => {
          const index = state.drafts.findIndex(item => item.id === note.id)
          state.drafts.splice(index, 1)
        })
      )
    },
    addDraft: (locator) => {
      set(
        produce((state: AnnotationDraftState) => {
          state.drafts.unshift(createDraftNote(locator))
        })
      )
    },
  }
}))
