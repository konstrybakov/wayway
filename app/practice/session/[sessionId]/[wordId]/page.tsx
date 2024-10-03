import 'server-only'
import { prisma } from '@/lib/db/client'

import { redirect } from 'next/navigation'

import { auth } from '@clerk/nextjs/server'
import { WordForPracticeArgs } from './_common/query-args'
import type { WordPracticePageProps } from './_common/types'
import { Practice } from './_components/practice'

export default async function WordPracticePage({
  params: { wordId },
}: WordPracticePageProps) {
  auth().protect()

  const word = await prisma.word.findUnique({
    where: {
      id: Number(wordId),
    },
    ...WordForPracticeArgs,
  })

  if (!word) {
    redirect('/practice')
  }

  return <Practice word={word} />
}
