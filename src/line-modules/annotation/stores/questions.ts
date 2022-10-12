import create from 'zustand';
import { Note, Question } from '../../../types';
import produce from 'immer';


export interface QuestionsState {
  questions: any[];
  mutations: {
    addQuestion: (questions: Question) => void
  }
}


export const useQuestions = create<QuestionsState>((set) => ({
  questions: [],
  mutations: {
    addQuestion: (question: Question) => {
      set(
        produce((state: QuestionsState) => {
          // state.questions.unshift(createDraftNote(locator))
        })
      )
    },
  }
}))
