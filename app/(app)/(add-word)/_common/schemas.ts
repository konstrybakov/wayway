import {
  DifficultyCategory,
  FrequencyCategory,
  RegisterCategory,
} from '@prisma/client'
import { z } from 'zod'

export const AddWordFormSchema = z.object({
  word: z
    .string()
    .min(1, 'Word must be at least 1 character long')
    .max(100, 'Word must be at most 100 characters long')
    .trim(),
  translation: z
    .string()
    .min(1, 'Translation must be at least 1 character long')
    .max(100, 'Translation must be at most 100 characters long')
    .trim(),
  description: z
    .string()
    .max(1000, 'Description must be at most 1000 characters long')
    .trim()
    .optional(),
  pos: z.string().optional(),
  difficultyCategory: z.nativeEnum(DifficultyCategory).optional(),
  frequencyCategory: z.nativeEnum(FrequencyCategory).optional(),
  registerCategory: z.nativeEnum(RegisterCategory).optional(),
  category: z.string().optional(),
})
