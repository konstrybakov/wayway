import { modelO } from '@/lib/llm/models'
import { generateObject } from 'ai'
import { ProofcheckResultsSchema, StructuredDefinitionsSchema } from './schemas'
import type { ProofcheckResults, StructuredDefinitions } from './types'
import {
  proofcheckSystemPrompt,
  structureDefinitionsSystemPrompt,
} from './system-prompts'
import {
  proofcheckUserPrompt,
  structureDefinitionsUserPrompt,
} from './user-prompts'
import { logger as pinoLogger } from '@/lib/logger'

export const getProofcheckResults = async (
  definitions: string[],
  categories: string[],
) => {
  const logger = pinoLogger.child({
    method: 'getProofcheckResults',
  })

  logger.debug('Getting proofcheck results')

  const { object: structuredDefinitions } =
    await generateObject<StructuredDefinitions>({
      model: modelO,
      system: structureDefinitionsSystemPrompt,
      prompt: structureDefinitionsUserPrompt(definitions),
      schema: StructuredDefinitionsSchema,
    })

  logger.debug(
    {
      structuredDefinitions: structuredDefinitions.definitions.map(
        ({ word, translation }) => `${word}: ${translation}`,
      ),
    },
    'Structured definitions',
  )

  const { object: proofcheckResults } = await generateObject<ProofcheckResults>(
    {
      model: modelO,
      system: proofcheckSystemPrompt,
      prompt: proofcheckUserPrompt(
        structuredDefinitions.definitions,
        categories,
      ),
      schema: ProofcheckResultsSchema,
    },
  )

  logger.debug('Proofcheck results received')

  return proofcheckResults.proofcheckResults
}
