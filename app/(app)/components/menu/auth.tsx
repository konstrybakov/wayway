import { auth, signOut } from '@/app/(auth)/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AvatarIcon } from '@radix-ui/react-icons'
import { BoltIcon, CircleUserIcon, LogInIcon, LogOutIcon } from 'lucide-react'

import Link from 'next/link'
import { redirect } from 'next/navigation'

export const Auth = async () => {
  const session = await auth()

  if (!session) {
    return (
      <form
        action={async () => {
          'use server'

          redirect('/signin')
        }}
      >
        <Button variant="outline" className="flex ml-auto gap-2">
          <LogInIcon size={16} />
          <span>Sign in</span>
        </Button>
      </form>
    )
  }

  const image = session.user?.image ?? undefined

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-10 h-10"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={image} />
            <AvatarFallback>
              <AvatarIcon />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center gap-2 p-2">
          <div className="grid gap-0.5 leading-none">
            <div className="font-semibold">{session.user?.name}</div>
            <div className="text-sm text-muted-foreground">
              {session.user?.email}
            </div>
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
          <form
            action={async () => {
              'use server'

              await signOut()
            }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <LogOutIcon size={16} />
              <span>Sign out</span>
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
