'use client'

import { Button } from '@/components/ui/button'
import { PlusIcon, RepeatIcon } from 'lucide-react'
import { startNewSession } from './actions/start-new-session'

type StartPracticeButtonsProps = {
  userId: string
}

export const StartPracticeButtons = ({ userId }: StartPracticeButtonsProps) => {
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
