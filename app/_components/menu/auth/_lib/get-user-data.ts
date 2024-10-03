import { auth } from '@clerk/nextjs/server'
import type { UserForDropdown } from '../_common/types'

export const getUserData = (): UserForDropdown => {
  const { sessionClaims } = auth().protect()

  return {
    firstName: sessionClaims.name,
    profileImageUrl: sessionClaims.imgsrc,
    email: sessionClaims.email,
  }
}
