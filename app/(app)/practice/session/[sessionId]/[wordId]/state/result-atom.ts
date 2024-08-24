import { atom } from 'jotai'

export const resultAtom = atom<
  'correct' | 'incorrect' | 'skipped' | undefined
>()
