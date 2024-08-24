import { signIn } from '@/app/(auth)/auth'
import { Button } from '@/components/ui/button'
import { GithubIcon } from 'lucide-react'

export const GithubSigninButton = () => {
  return (
    <form
      action={async () => {
        'use server'

        await signIn('github', { redirectTo: '/' })
      }}
    >
      <Button className="w-full">
        <GithubIcon className="mr-2 h-4 w-4" />
        Sign in with GitHub
      </Button>
    </form>
  )
}
