import {
  DifficultyCategory,
  FrequencyCategory,
  RegisterCategory,
} from '@prisma/client'
import { z } from 'zod'

export const TranslationSchema = z.object({
  correctOriginal: z
    .string()
    .describe(
      'The correctly spelled version of the original Finnish word or phrase',
    ),
  baseForm: z
    .string()
    .describe('The most basic form of the word or phrase in Finnish'),
  baseTranslation: z
    .string()
    .describe('The English translation of the base form'),
  translation: z
    .string()
    .describe('The English translation of the word or phrase'),
  description: z
    .string()
    .nullable()
    .describe('A short description of the meaning and usage in English'),
  partOfSpeech: z
    .string()
    .nullable()
    .describe('The part of speech (word class) of the word')
    .transform(value => value?.toLocaleLowerCase() ?? null),
  thematicCategory: z
    .array(
      z
        .string()
        .describe('The thematic category of the word or phrase')
        .transform(value => value?.toLocaleLowerCase() ?? null),
    )
    .describe('The thematic categories of the word or phrase'),
  difficultyCategory: z
    .nativeEnum(DifficultyCategory)
    .nullable()
    .describe('The difficulty category of the word or phrase'),
  registerCategory: z
    .nativeEnum(RegisterCategory)
    .nullable()
    .describe('The register category of the word or phrase'),
  frequencyCategory: z
    .nativeEnum(FrequencyCategory)
    .nullable()
    .describe('The frequency category of the word or phrase'),
  error: z
    .string()
    .nullable()
    .describe('A short description of the typo or spelling mistake'),
  examples: z
    .array(
      z.object({
        original: z.string().describe('A simple example sentence in Finnish'),
        translation: z
          .string()
          .describe('The English translation of the example sentence'),
      }),
    )
    .describe(
      '2-3 simple example sentences in Finnish, each with an English translation',
    ),
})
