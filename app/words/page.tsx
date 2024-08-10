import { Words } from '@/app/words/words'
import { prisma } from '@/lib/db/client'
import { redirect } from 'next/navigation'

import { auth } from '@/app/auth'
import { WordsForTable } from './prisma-args'

import 'server-only'

export default async function WordsPage() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    redirect('/signin')
  }

  const words = await prisma.word.findMany({
    where: { userId },
    ...WordsForTable,
  })

  return <Words words={words} />
}
