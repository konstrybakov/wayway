import { prisma } from '@/lib/db/client'
import { auth } from '@clerk/nextjs/server'
import { AddWordForm } from './_components/add-word-form'
import { CategoriesArgs } from './query-args'

export default async function AddWordPage() {
  auth().protect()

  const categories = await prisma.category.findMany(CategoriesArgs)

  return <AddWordForm categories={categories} />
}
