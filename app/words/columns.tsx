'use client'
import { Badge } from '@/components/ui/badge'
import type { Word } from '@prisma/client'
import type { ColumnDef } from '@tanstack/react-table'
import { titleCase } from 'title-case'

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
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const formatted = row
        .getValue<Word['category']>('category')
        .map(category => titleCase(category))

      return (
        <div className="flex gap-2">
          {formatted.map(category => (
            <Badge key={category}>{category}</Badge>
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
] satisfies ColumnDef<Word>[]
