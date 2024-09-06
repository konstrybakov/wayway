import type { z } from 'zod'
import type { AddWordFormSchema } from './schemas'
import type { CategoriesArgs } from '@/app/(app)/(add-word)/query-args'
import type { Prisma } from '@prisma/client'

export type AddWordFormValues = z.infer<typeof AddWordFormSchema>
export type Category = Prisma.CategoryGetPayload<typeof CategoriesArgs>
export type CategoryWithCreate = Category & {
  create?: true
}
