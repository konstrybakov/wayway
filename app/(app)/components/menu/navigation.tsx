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
import { usePathname, useRouter } from 'next/navigation'
import { useHotkeys } from 'react-hotkeys-hook'

const menuConfig = [
  // TODO: temp hide navigation
  // { href: '/', label: 'Add Word', icon: DiamondPlusIcon },
  { href: '/search', label: 'Search', icon: SearchIcon },
  { href: '/words', label: 'Words', icon: Rows4Icon },
  { href: '/practice', label: 'Practice', icon: GamepadIcon },
]

export const Navigation = () => {
  const router = useRouter()
  const pathname = usePathname()

  // TODO: temp remove hotkey
  // useHotkeys('a', () => router.push('/'))
  useHotkeys('s', () => router.push('/search'))
  useHotkeys('w', () => router.push('/words'))
  useHotkeys('p', () => router.push('/practice'))

  return (
    <NavigationMenu className="flex-none">
      <NavigationMenuList>
        {menuConfig.map(({ href, label, icon: Icon }) => (
          <NavigationMenuItem key={href}>
            <Link href={href} legacyBehavior passHref>
              <NavigationMenuLink
                active={pathname === href}
                className={cn(navigationMenuTriggerStyle(), 'flex gap-2')}
              >
                <Icon size={16} />
                <span>{label}</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
