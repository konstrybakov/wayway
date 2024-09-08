import { prisma } from '@/lib/db/client'
import type { WordsToProofcheck } from './types'
import type { Prisma, Word } from '@prisma/client'
import type { ProofcheckResult } from './llm/types'
import { logger as pinoLogger } from '@/lib/logger'

export const save = async (
  word: WordsToProofcheck,
  results: ProofcheckResult[],
) => {
  const logger = pinoLogger.child({
    method: 'save',
  })

  logger.debug(
    { word: word.word, proofcheckCount: results.length },
    'Saving word and results',
  )

  return prisma.$transaction([
    prisma.word.update({
      where: { id: word.id },
      data: {
        proofchecked: true,
      },
    }),
    ...results.map(result =>
      prisma.wordData.create(createWordData(result, word.id)),
    ),
  ])
}

const createWordData = (
  result: ProofcheckResult,
  wordId: Word['id'],
): Prisma.WordDataCreateArgs => ({
  data: {
    proofcheckResult: {
      create: {
        categories: result.thematicCategory,
        wordId: wordId,
      },
    },
    translation: result.translation,
    pos: result.pos,
    description: result.description,
    examples: {
      createMany: {
        data: result.examples.map(({ translation, original }) => ({
          translation,
          original,
        })),
      },
    },
  },
})
