import create from 'zustand';
import produce from 'immer';

interface CommentState {
  reviewId: null | number,
  mutations: {
    setReviewId: (id: number) => void
  }
}

export const useInterviewStore = create<CommentState>((set) => ({
  reviewId: null,
  mutations: {
    setReviewId: (id) => {
      set(
        produce((state: CommentState) => {
          state.reviewId = id
        })
      )
    }
  }
}))
