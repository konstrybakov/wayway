import { auth } from '@/app/(auth)/auth'
import { AddWordForm } from './components/add-word-form'
import { redirect } from 'next/navigation'

export default async function AddWordPage() {
  const session = await auth()

  const user = session?.user

  if (!user) {
    redirect('/signin')
  }

  return <AddWordForm />
}
