import type { Prisma } from '@prisma/client'

export const UserForDropdownArgs = {
  select: {
    firstName: true,
    profileImageUrl: true,
    email: true,
  },
} satisfies Omit<Prisma.UserFindUniqueArgs, 'where'>
