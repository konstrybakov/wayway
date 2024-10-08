import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SignOutButton } from '@clerk/nextjs'
import { AvatarIcon } from '@radix-ui/react-icons'
import { BoltIcon, CircleUserIcon, LogOutIcon } from 'lucide-react'
import Link from 'next/link'
import { getUserData } from './_lib/get-user-data'
import { getImageParams } from './_utils/image-params'

export const UserDropdown = () => {
  const { profileImageUrl, firstName, email } = getUserData()
  const image = profileImageUrl
    ? `${profileImageUrl}?${getImageParams()}`
    : undefined

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-10 h-10"
        >
          <Avatar className="h-12 w-12">
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
            <div className="font-semibold">{firstName}</div>
            <div className="text-sm text-muted-foreground">{email}</div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href="/user-profile"
            className="flex items-center gap-2"
            prefetch={false}
          >
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
