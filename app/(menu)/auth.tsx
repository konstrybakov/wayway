import { auth, signIn } from '@/app/auth'
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

export const Auth = async () => {
  const session = await auth()

  if (!session) {
    return (
      <Button
        variant="outline"
        onClick={async () => {
          'use server'

          await signIn()
        }}
        className="flex ml-auto gap-2"
      >
        <LogInIcon size={16} />
        <span>Sign in</span>
      </Button>
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
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <LogOutIcon size={16} />
            <span>Sign out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
