import type { RowData } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    deleteRow: (rowIndex: number) => void
  }

  interface ColumnMeta<TData extends RowData, TValue> {
    title: string
  }
}

declare global {
  interface CustomJwtSessionClaims {
    name?: string
    email?: string
    imgsrc?: string
  }
}
