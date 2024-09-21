import { auth } from '@clerk/nextjs/server'
import { Search } from './_components/search'

export default async function SearchPage() {
  auth().protect()

  return <Search />
}
