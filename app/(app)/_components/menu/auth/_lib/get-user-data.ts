import { prisma } from '@/lib/db/client'
import { GetUserDropdownDataArgs } from '../query-args'
import type { UserDropdownData } from '../types'

export const getUserData = async (
  userId: string,
): Promise<UserDropdownData | null> =>
  // TODO: if this doesn't return anything - call the clerk one and get the data
  prisma.user.findUnique({
    where: { id: userId },
    ...GetUserDropdownDataArgs,
  })
