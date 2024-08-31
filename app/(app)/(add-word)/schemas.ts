import { z } from 'zod'
import { WordSchema } from '@/prisma/zod/word'
import {
  DifficultyCategory,
  FrequencyCategory,
  RegisterCategory,
} from '@prisma/client'

export const AddWordFormSchema = WordSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
})
  .extend({
    description: z.string().optional(),
    difficultyCategory: z.nativeEnum(DifficultyCategory).optional(),
    frequencyCategory: z.nativeEnum(FrequencyCategory).optional(),
    registerCategory: z.nativeEnum(RegisterCategory).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.word.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Word must be at least 1 character long',
        path: ['word'],
      })
    }

    if (data.translation.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Translation must be at least 1 character long',
        path: ['translation'],
      })
    }
  })
