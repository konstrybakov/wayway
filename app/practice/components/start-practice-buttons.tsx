'use client'

import { Button } from '@/components/ui/button'
import { PlusIcon, RepeatIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useHotkeys } from 'react-hotkeys-hook'
import { startNewSession } from '../actions/start-new-session'

type StartPracticeButtonsProps = {
  userId: string
}

export const StartPracticeButtons = ({ userId }: StartPracticeButtonsProps) => {
  const router = useRouter()

  useHotkeys('1', () => router.push('/'))
  useHotkeys('2', () => router.push('/words'))

  return (
    <>
      <Button
        className="flex gap-2 grow"
        onClick={() => startNewSession(userId)}
      >
        <PlusIcon size={16} />
        Learn Words
      </Button>
      <Button variant="secondary" className="flex gap-2 grow">
        <RepeatIcon size={16} />
        Review Words
      </Button>
    </>
  )
}
