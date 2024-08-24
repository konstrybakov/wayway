import { KeycloakSigninButton } from '@/app/(auth)/signin/keycloak-signin-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { GithubSigninButton } from './github-signin-button'

const SHOW_KEYCLOAK = process.env.DEV_AUTH === 'keycloak'

export default function SignInPage() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Choose your preferred sign-in method</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <GithubSigninButton />
          {SHOW_KEYCLOAK && <KeycloakSigninButton />}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500 text-center w-full">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </CardFooter>
    </Card>
  )
}
