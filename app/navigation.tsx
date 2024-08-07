'use client'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { GamepadIcon, Rows4Icon, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Navigation = () => {
  const pathname = usePathname()

  return (
    <NavigationMenu className="p-6 min-w-full flex-none">
      <NavigationMenuList className="">
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink
              active={pathname === '/'}
              className={cn(navigationMenuTriggerStyle(), 'flex gap-2')}
            >
              <SearchIcon size={16} />
              <span>Search</span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/words" legacyBehavior passHref>
            <NavigationMenuLink
              active={pathname === '/words'}
              className={cn(navigationMenuTriggerStyle(), 'flex gap-2')}
            >
              <Rows4Icon size={16} />
              <span>Words</span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/practice" legacyBehavior passHref>
            <NavigationMenuLink
              active={pathname === '/practice'}
              className={cn(navigationMenuTriggerStyle(), 'flex gap-2')}
            >
              <GamepadIcon size={16} />
              <span>Practice</span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
