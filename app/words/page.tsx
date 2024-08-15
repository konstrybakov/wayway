import { prisma } from '@/lib/db/client'
import { redirect } from 'next/navigation'
import { Words } from './components/words'

import { auth } from '@/app/auth'
import { WordsForTableArgs } from './prisma-args'

import 'server-only'

export default async function WordsPage() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    redirect('/signin')
  }

  const words = await prisma.word.findMany({
    where: { userId },
    orderBy: { word: 'asc' },
    ...WordsForTableArgs,
  })

  return <Words words={words} />
}
