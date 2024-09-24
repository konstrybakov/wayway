import type { Prisma } from '@prisma/client'
import type { GetUserDropdownDataArgs } from './query-args'

export interface UserDropdownData
  extends Prisma.UserGetPayload<typeof GetUserDropdownDataArgs> {}
