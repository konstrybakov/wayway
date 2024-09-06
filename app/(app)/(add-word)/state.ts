import type { CategoryWithCreate } from '@/app/(app)/(add-word)/types'
import { atom } from 'jotai'

export const categoriesAtom = atom<CategoryWithCreate[]>([])
