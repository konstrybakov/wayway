import { columns } from './columns'
import { DataTable } from './data-table'
import type { WordForTable } from './types'

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
