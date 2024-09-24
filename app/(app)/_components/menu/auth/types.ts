import type { Prisma } from '@prisma/client'
import type { UserForDropdownArgs } from './query-args'

export interface UserForDropdown
  extends Prisma.UserGetPayload<typeof UserForDropdownArgs> {}
