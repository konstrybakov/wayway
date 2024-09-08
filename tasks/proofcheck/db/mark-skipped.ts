import { prisma } from '@/lib/db/client'
import type { WordToProofcheck } from './types'
import { ProofcheckWordStatus } from '@prisma/client'

export const markSkipped = async (wordIds: WordToProofcheck['id'][]) =>
  prisma.word.updateMany({
    where: {
      id: {
        in: wordIds,
      },
    },
    data: {
      proofcheckStatus: ProofcheckWordStatus.Skipped,
    },
  })
