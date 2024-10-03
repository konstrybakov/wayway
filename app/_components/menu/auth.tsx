import 'server-only'

import { auth } from '@clerk/nextjs/server'
import { Suspense } from 'react'
import { SignInButton } from './auth/sign-in-button'
import { UserDropdown } from './auth/user-dropdown'
import { UserDropdownSkeleton } from './auth/user-dropdown-skeleton'

export const Auth = async () => {
  const { userId } = auth().protect()

  if (!userId) {
    return <SignInButton />
  }

  return (
    <Suspense fallback={<UserDropdownSkeleton />}>
      <UserDropdown />
    </Suspense>
  )
}
