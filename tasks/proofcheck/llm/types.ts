import type { z } from 'zod'
import type {
  ProofcheckResultSchema,
  ProofcheckResultsSchema,
  StructuredDefinitionSchema,
  StructuredDefinitionsSchema,
} from './schemas'

export type StructuredDefinition = z.infer<typeof StructuredDefinitionSchema>
export type StructuredDefinitions = z.infer<typeof StructuredDefinitionsSchema>

export type ProofcheckResult = z.infer<typeof ProofcheckResultSchema>
export type ProofcheckResults = z.infer<typeof ProofcheckResultsSchema>
