'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import { deleteWord } from '../_actions/delete-word'
import type { WordForTable } from '../_common/types'
import { DataTableColumnHeader } from './column-header'

// TODO: start using column helper, otherwise columns are not typesafe
// const columnHelper = createColumnHelper<WordForTable>()

export const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value =>
          table.toggleAllPageRowsSelected(Boolean(value))
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(Boolean(value))}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'word',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Word" />
    },
    cell: ({ getValue }) => {
      return (
        <span className="font-semibold">
          {getValue<WordForTable['word']>()}
        </span>
      )
    },
    enableGlobalFilter: true,
    meta: {
      title: 'Word',
    },
  },
  {
    accessorKey: 'translation',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Translation" />
    },
    enableGlobalFilter: true,
    meta: {
      title: 'Translation',
    },
  },
  {
    accessorKey: 'pos',
    header: 'Part of Speech',
    cell: ({ getValue }) => {
      const formatted = titleCase(getValue<WordForTable['pos']>() ?? '')

      return <Badge variant="secondary">{formatted}</Badge>
    },
    meta: {
      title: 'Part of Speech',
    },
  },
  {
    accessorKey: 'categories',
    header: 'Categories',
    cell: ({ getValue }) => {
      const formatted = getValue<WordForTable['categories']>().map(({ name }) =>
        titleCase(name),
      )

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
    meta: {
      title: 'Categories',
    },
  },
  {
    accessorKey: 'difficultyCategory',
    header: 'Difficulty',
    cell: ({ getValue }) => {
      const formatted = titleCase(
        getValue<WordForTable['difficultyCategory']>() ?? '',
      )

      return <Badge variant="outline">{formatted}</Badge>
    },
    meta: {
      title: 'Difficulty',
    },
  },
  {
    accessorKey: 'frequencyCategory',
    header: 'Frequency',
    cell: ({ getValue }) => {
      const formatted = titleCase(
        getValue<WordForTable['frequencyCategory']>() ?? '',
      )

      return <Badge variant="outline">{formatted}</Badge>
    },
    meta: {
      title: 'Frequency',
    },
  },
  {
    accessorKey: 'registerCategory',
    header: 'Register',
    cell: ({ getValue }) => {
      const formatted = titleCase(
        getValue<WordForTable['registerCategory']>() ?? '',
      )

      return <Badge variant="outline">{formatted}</Badge>
    },
    meta: {
      title: 'Register',
    },
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
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

                // TODO: handle this undefined
                table.options.meta?.deleteRow(row.index)

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
    enableHiding: false,
  },
] satisfies ColumnDef<WordForTable>[]
