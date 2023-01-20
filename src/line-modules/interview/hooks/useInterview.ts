import { useQuery } from '@tanstack/react-query';
import * as interviewApi from '../api/interview';
import { atom, useAtom } from 'jotai';
import { atomWithToggle } from '../atoms';

export const isVisibleAtom = atomWithToggle(true)
export const hiddenNotesIdsAtom = atom<any[]>([])

export const useInterview = (reviewId) => {
  const commentsQuery = useQuery(['interview'], () => interviewApi.fetch(reviewId))
  
  return {
    commentsQuery,
    useIsVisibleAtom: useAtom(isVisibleAtom)
  }
}
