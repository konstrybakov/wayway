import { prisma } from '@/lib/db/client'
import { ProofcheckWordStatus } from '@prisma/client'

const proofchecks = await prisma.proofcheckResult.findMany({
  select: { id: true },
})

const proofcheckIds = proofchecks.map(proofcheck => proofcheck.id)

await prisma.$transaction([
  prisma.wordData.deleteMany({
    where: {
      proofcheckResult: {
        id: {
          in: proofcheckIds,
        },
      },
    },
  }),
  prisma.word.updateMany({
    data: {
      proofcheckStatus: ProofcheckWordStatus.NotChecked,
    },
  }),
])
