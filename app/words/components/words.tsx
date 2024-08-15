import type { WordForTable } from '../types'
import { columns } from './columns'
import { DataTable } from './data-table'

type WordsProps = {
  words: WordForTable[]
}

export const Words = ({ words }: WordsProps) => {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={words} />
    </div>
  )
}
