import type { Prisma, Word } from '@prisma/client'
import type { z } from 'zod'
import type { CategoriesArgs } from './query-args'
import type { AddWordFormSchema } from './schemas'

export interface AddWordFormValues extends z.infer<typeof AddWordFormSchema> {}
export interface Category
  extends Prisma.CategoryGetPayload<typeof CategoriesArgs> {}

export interface CreateWordResponseData {
  wordId: Word['id']
}
