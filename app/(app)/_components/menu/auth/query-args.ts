import type { Prisma } from '@prisma/client'

export const GetUserDropdownDataArgs = {
  select: {
    firstName: true,
    profileImageUrl: true,
    email: true,
  },
} satisfies Omit<Prisma.UserFindUniqueArgs, 'where'>
