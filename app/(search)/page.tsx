import { redirect } from 'next/navigation'
import { auth } from '../auth'
import { Search } from './search'

export default async function Home() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    redirect('/signin')
  }

  return <Search userId={userId} />
}
