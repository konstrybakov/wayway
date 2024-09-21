import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { auth /* currentUser */ } from '@clerk/nextjs/server'
import { AvatarIcon } from '@radix-ui/react-icons'
import { BoltIcon, CircleUserIcon, LogInIcon, LogOutIcon } from 'lucide-react'

import { SignInButton, SignOutButton } from '@clerk/nextjs'
import Link from 'next/link'

export const Auth = async () => {
  const { userId } = auth().protect()

  // TODO: sync users data

  if (!userId) {
    return (
      <SignInButton>
        <Button variant="outline" className="flex ml-auto gap-2">
          <LogInIcon size={16} />
          <span>Sign in</span>
        </Button>
      </SignInButton>
    )
  }

  // TODO: get user data after syncing
  // const image = user?.imageUrl

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-10 h-10"
        >
          <Avatar className="h-8 w-8">
            {/* TODO: get user image */}
            <AvatarImage src={'image'} />
            <AvatarFallback>
              <AvatarIcon />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center gap-2 p-2">
          <div className="grid gap-0.5 leading-none">
            {/* TODO: get user name */}
            <div className="font-semibold">{userId}</div>
            {/* TODO: get user email */}
            <div className="text-sm text-muted-foreground">{userId}</div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <CircleUserIcon size={16} />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <BoltIcon size={16} />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOutButton>
            <Button
              className="flex items-center gap-2"
              variant="passthrough"
              size="passthrough"
            >
              <LogOutIcon size={16} />
              <span>Sign out</span>
            </Button>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
