import type { Prisma } from '@prisma/client'

export const CategoriesArgs = {
  select: {
    id: true,
    name: true,
  },
  distinct: 'name',
  orderBy: {
    name: 'asc',
  },
} satisfies Prisma.CategoryFindManyArgs
