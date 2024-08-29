import { auth } from '@/app/(auth)/auth'
import { redirect } from 'next/navigation'
import { Search } from './components/search'

export default async function Home() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    redirect('/signin')
  }

  return <Search userId={userId} />
}
