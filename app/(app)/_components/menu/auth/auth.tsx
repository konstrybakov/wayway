import 'server-only'

import { auth } from '@clerk/nextjs/server'
import { getUserData } from './_lib/get-user-data'
import { SignInButton } from './sign-in-button'
import { SignUpButton } from './sign-up-button'
import { UserDropdown } from './user-dropdown'

export const Auth = async () => {
  const { userId } = auth().protect()

  if (!userId) {
    return <SignInButton />
  }

  const user = await getUserData(userId)

  if (!user) {
    // TODO: this shouldn't really happen, if this happens it means the webhook failed to be called
    // TODO: maybe on user created I have to manually create an entry
    return <SignUpButton />
  }

  return <UserDropdown user={user} />
}
