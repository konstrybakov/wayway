import { signIn } from '@/app/(auth)/auth'
import { Button } from '@/components/ui/button'
import { LockIcon } from 'lucide-react'

export const KeycloakSigninButton = () => {
  return (
    <form
      action={async () => {
        'use server'

        await signIn('keycloak', { redirectTo: '/' })
      }}
    >
      <Button className="w-full">
        <LockIcon className="mr-2 h-4 w-4" />
        Sign in with Keycloak
      </Button>
    </form>
  )
}
