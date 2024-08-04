import { Words } from '@/app/words/words'
import { PrismaClient } from '@prisma/client'

export default async function WordsPage() {
  const prisma = new PrismaClient()
  const words = await prisma.word.findMany()

  return <Words words={words} />
}
