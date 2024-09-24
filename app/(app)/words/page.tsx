import { prisma } from '@/lib/db/client'
import { Words } from './_components/words'

import { WordsForTableArgs } from './query-args'

import 'server-only'
import { auth } from '@clerk/nextjs/server'

export const dynamic = 'force-dynamic'

export default async function WordsPage() {
  const { userId } = auth().protect()

  // TODO: watch this. even though it's super comfy to handle all data client side - should consider db traffic
  const words = await prisma.word.findMany({
    where: { userId },
    orderBy: { word: 'asc' },
    ...WordsForTableArgs,
  })

  return <Words words={words} />
}
