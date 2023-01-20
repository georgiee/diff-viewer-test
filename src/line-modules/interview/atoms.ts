/**
 * Let's test jotai even though we already deal with zustand & react-query
 * it's worth to try it out once.
 */


import { atom, WritableAtom } from 'jotai'

export function atomWithToggle(
  initialValue?: boolean
): WritableAtom<boolean, boolean | undefined> {
  const anAtom = atom(initialValue, (get, set, nextValue?: boolean) => {
    const update = nextValue ?? !get(anAtom)
    set(anAtom, update)
  })

  return anAtom as WritableAtom<boolean, boolean | undefined>
}

export const notesConfigurationAtom = atom<any>({})


export const hideNoteAtom = atom(
  null,
  (get, set, noteId: any) => {
    const configuration = get(notesConfigurationAtom)
    configuration[noteId] = !configuration[noteId]
    set(notesConfigurationAtom, {...configuration})
  }
)

export const visibleNoteAtoms = atom(
  (get, noteId: any) => {
    const configuration = get(notesConfigurationAtom)
    return configuration[noteId]
  }
)
