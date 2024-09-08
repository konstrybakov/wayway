import {
  DifficultyCategory,
  FrequencyCategory,
  RegisterCategory,
} from '@prisma/client'
import { z } from 'zod'

export const ProofcheckResultSchema = z.object({
  word: z
    .string()
    .describe(
      'In Finnish. The word or phrase. Remove any additional information specified in parentheses.',
    ),
  translation: z
    .string()
    .describe(
      'In English. The translation of the word or phrase. Mark as (spoken) if used in colloquial language. Mark as (plural) if the word is plural.',
    ),
  pos: z
    .string()
    .transform(value => value.toLocaleLowerCase())
    .describe(
      'Part of speech of the word. If not just a word: use idiom or phrase.',
    ),
  description: z
    .string()
    .describe('In English. The description of the word or phrase.'),
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
  thematicCategory: z
    .array(
      z
        .string()
        .describe('The thematic category of the word or phrase')
        .transform(value => value.toLocaleLowerCase()),
    )
    .describe('The thematic categories of the word or phrase'),
  examples: z
    .array(
      z.object({
        original: z
          .string()
          .describe('In Finnish. Example in sentence, phrase or idiom.'),
        translation: z
          .string()
          .describe('In English. Translation of the example.'),
      }),
    )
    .describe('Examples of usage of the word or phrase. 2-3 examples max.'),
})

export const ProofcheckResultsSchema = z.object({
  proofcheckResults: z.array(ProofcheckResultSchema),
})

export const StructuredDefinitionSchema = z.object({
  word: z
    .string()
    .transform(value => value.toLocaleLowerCase())
    .describe('In Finnish. Word or phrase.'),
  translation: z
    .string()
    .describe('In English. The translation of the word or phrase.'),
})

export const StructuredDefinitionsSchema = z.object({
  definitions: z.array(StructuredDefinitionSchema),
})
