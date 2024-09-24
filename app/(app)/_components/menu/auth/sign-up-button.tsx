import { Button } from '@/components/ui/button'
import { SignUpButton as ClerkSignUpButton } from '@clerk/nextjs'
import { UserPlusIcon } from 'lucide-react'

export const SignUpButton = () => (
  <ClerkSignUpButton>
    <Button variant="outline" className="flex ml-auto gap-2">
      <UserPlusIcon size={16} />
      <span>Sign up</span>
    </Button>
  </ClerkSignUpButton>
)
