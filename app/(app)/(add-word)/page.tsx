import { auth } from '@/app/(auth)/auth'
import { AddWordForm } from './components/add-word-form'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db/client'
import { CategoriesArgs } from '@/app/(app)/(add-word)/query-args'

export default async function AddWordPage() {
  const session = await auth()

  const user = session?.user

  if (!user) {
    redirect('/signin')
  }

  // TODO: temp redirect to search
  redirect('/search')

  const categories = await prisma.category.findMany(CategoriesArgs)

  return <AddWordForm categories={categories} />
}
