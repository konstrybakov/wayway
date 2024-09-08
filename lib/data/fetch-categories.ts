import { prisma } from '@/lib/db/client'

export const fetchCategories = async () => {
  const categories = await prisma.category.findMany({
    select: { name: true },
    distinct: ['name'],
  })

  return categories.map(({ name }) => name)
}
