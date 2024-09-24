import { Button } from '@/components/ui/button'
import { SignInButton as ClerkSignInButton } from '@clerk/nextjs'
import { LogInIcon } from 'lucide-react'

export const SignInButton = () => (
  <ClerkSignInButton>
    <Button variant="outline" className="flex ml-auto gap-2">
      <LogInIcon size={16} />
      <span>Sign in</span>
    </Button>
  </ClerkSignInButton>
)
