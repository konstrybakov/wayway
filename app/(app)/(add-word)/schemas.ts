import { z, type ZodType } from 'zod'
import {
  DifficultyCategory,
  FrequencyCategory,
  RegisterCategory,
} from '@prisma/client'
import type { Category } from '@/app/(app)/(add-word)/types'

export const AddWordFormSchema = z.object({
  word: z.string().min(1, 'Word must be at least 1 character long'),
  translation: z
    .string()
    .min(1, 'Translation must be at least 1 character long'),
  description: z.string().optional(),
  difficultyCategory: z.nativeEnum(DifficultyCategory).optional(),
  frequencyCategory: z.nativeEnum(FrequencyCategory).optional(),
  registerCategory: z.nativeEnum(RegisterCategory).optional(),
  category: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        create: z.boolean().optional(),
      }) satisfies ZodType<Category>,
    )
    .optional(),
})
