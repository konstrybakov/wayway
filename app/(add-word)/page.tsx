import { prisma } from '@/lib/db/client'
import { auth } from '@clerk/nextjs/server'
import { CategoriesArgs } from './_common/query-args'
import { AddWordForm } from './_components/add-word-form'

export default async function AddWordPage() {
  auth().protect()

  const categories = await prisma.category.findMany(CategoriesArgs)

  return <AddWordForm categories={categories} />
}
