import { prisma } from '@/lib/db/client'
import { WordsToProofcheckArgs } from './query-args'

export const fetchWordsToProofcheck = async (page: number, pageSize: number) =>
  prisma.word.findMany({
    where: {
      proofchecked: false,
    },
    ...WordsToProofcheckArgs,
    skip: (page - 1) * pageSize,
    take: pageSize,
  })
