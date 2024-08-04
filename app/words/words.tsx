import type { Word } from '@prisma/client'
import { columns } from './columns'
import { DataTable } from './data-table'

type WordsProps = {
  words: Word[]
}

export const Words = ({ words }: WordsProps) => {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={words} />
    </div>
  )
}
