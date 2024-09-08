import { prisma } from '@/lib/db/client'
import { WordToProofcheckArgs } from './query-args'
import { ProofcheckWordStatus } from '@prisma/client'

export const fetchWordsToProofcheck = async (page: number, pageSize: number) =>
  prisma.word.findMany({
    where: {
      proofcheckStatus: ProofcheckWordStatus.NotChecked,
    },
    ...WordToProofcheckArgs,
    skip: (page - 1) * pageSize,
    take: pageSize,
  })
