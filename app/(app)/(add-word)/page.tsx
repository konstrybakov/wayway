import { auth } from '@/app/(auth)/auth'
import { prisma } from '@/lib/db/client'
import { redirect } from 'next/navigation'
import { AddWordForm } from './components/add-word-form'
import { CategoriesArgs } from './query-args'

export default async function AddWordPage() {
  const session = await auth()

  const user = session?.user

  if (!user) {
    redirect('/signin')
  }

  const categories = await prisma.category.findMany(CategoriesArgs)

  return <AddWordForm categories={categories} />
}
