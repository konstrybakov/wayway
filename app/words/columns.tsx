'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontalIcon, TrashIcon } from 'lucide-react'
import { toast } from 'sonner'
import { titleCase } from 'title-case'
import { deleteWord } from './actions/delete-word'
import type { WordForTable } from './types'

export const columns = [
  {
    accessorKey: 'word',
    header: 'Word',
    cell: ({ row }) => {
      return <span className="font-semibold">{row.getValue('word')}</span>
    },
  },
  {
    accessorKey: 'translation',
    header: 'Translation',
  },
  {
    accessorKey: 'pos',
    header: 'Part of Speech',
    cell: ({ row }) => {
      const formatted = titleCase(row.getValue('pos'))

      return <Badge variant="secondary">{formatted}</Badge>
    },
  },
  {
    accessorKey: 'categories',
    header: 'Categories',
    cell: ({ row }) => {
      const formatted = row
        .getValue<WordForTable['categories']>('categories')
        .map(({ name }) => titleCase(name))

      return (
        <div className="flex gap-2">
          {formatted.map(category => (
            <Badge variant="secondary" key={category}>
              {category}
            </Badge>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: 'difficultyCategory',
    header: 'Difficulty',
    cell: ({ row }) => {
      const formatted = titleCase(row.getValue('difficultyCategory'))

      return <Badge variant="outline">{formatted}</Badge>
    },
  },
  {
    accessorKey: 'frequencyCategory',
    header: 'Frequency',
    cell: ({ row }) => {
      const formatted = titleCase(row.getValue('frequencyCategory'))

      return <Badge variant="outline">{formatted}</Badge>
    },
  },
  {
    accessorKey: 'registerCategory',
    header: 'Register',
    cell: ({ row }) => {
      const formatted = titleCase(row.getValue('registerCategory'))

      return <Badge variant="outline">{formatted}</Badge>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const word = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(word.translation)

                toast.success('Word translation copied to clipboard')
              }}
            >
              Copy word translation
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                deleteWord(word.id)

                toast.success('Word deleted')
              }}
              className="justify-between"
            >
              Delete
              <TrashIcon className="text-destructive" size="16" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
] satisfies ColumnDef<WordForTable>[]
