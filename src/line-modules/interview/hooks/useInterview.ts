import { useQuery } from '@tanstack/react-query';
import * as interviewApi from '../api/interview';
import { atom, useAtom } from 'jotai';

import { WritableAtom } from 'jotai'

export function atomWithToggle(
  initialValue?: boolean
): WritableAtom<boolean, boolean | undefined> {
  const anAtom = atom(initialValue, (get, set, nextValue?: boolean) => {
    const update = nextValue ?? !get(anAtom)
    set(anAtom, update)
  })

  return anAtom as WritableAtom<boolean, boolean | undefined>
}

export const isVisibleAtom = atomWithToggle(true)

export const useInterview = (reviewId) => {
  const commentsQuery = useQuery(['interview'], () => interviewApi.fetch(reviewId))
  
  const toggleNoteVisibility = (note)=> {
    console.log('toggleNoteVisibility', note)
  }
  return {
    commentsQuery,
    toggleNoteVisibility,
    useIsVisibleAtom: useAtom(isVisibleAtom)
  }
}
