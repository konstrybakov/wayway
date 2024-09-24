import { prisma } from '@/lib/db/client'
import { UserForDropdownArgs } from '../query-args'
import type { UserForDropdown } from '../types'

export const getUserData = async (
  userId: string,
): Promise<UserForDropdown | null> =>
  // TODO: if this doesn't return anything - call the clerk one and get the data
  prisma.user.findUnique({
    where: { id: userId },
    ...UserForDropdownArgs,
  })
