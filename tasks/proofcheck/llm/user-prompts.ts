import type { StructuredDefinition } from './types'

export const proofcheckUserPrompt = (
  definitions: StructuredDefinition[],
  categories: string[],
) => `
  Here are the definitions to process:
  
  <definitions>
    ${definitions
      .map(
        ({ word, translation }) => `word: ${word}\ntranslation: ${translation}`,
      )
      .join('\n----\n')}
  </definitions>
  <categories>
    ${categories.join('\n')}
  </categories>
  `

export const structureDefinitionsUserPrompt = (definitions: string[]) => `
  Here are the definitions to analyze:

  <definitions>
    ${definitions.join('\n----\n')}
  </definitions>
`
