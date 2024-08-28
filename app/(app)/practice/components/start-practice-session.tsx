'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Phase, PracticeSessionType } from '@prisma/client'
import { RocketIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import {
  type StartSessionOptions,
  startSession,
} from '../actions/start-practice-session'

type StartPracticeButtonsProps = {
  userId: string
}

export const StartPractice = ({ userId }: StartPracticeButtonsProps) => {
  const [nextPracticeWordCount, setNextPracticeWordCount] = useState(0)
  const [phases, setPhases] = useState<Phase[]>([])
  const [practiceTypes, setPracticeTypes] = useState<PracticeSessionType[]>([])
  const [wordCount, setWordCount] = useState('10')
  const router = useRouter()

  useHotkeys('s', () => router.push('/'))
  useHotkeys('w', () => router.push('/words'))

  const size = wordCount === 'all' ? null : Number.parseInt(wordCount, 10)

  const updateNextPracticeWordCount = async (
    override: Partial<StartSessionOptions>,
  ) => {
    const count = await startSession({
      phases,
      practiceTypes,
      userId,
      size,
      count: true,
      ...override,
    })

    setNextPracticeWordCount(count)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Start new session</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 items-start">
        <div className="flex flex-col gap-1 items-start">
          <p className="text-muted-foreground text-sm">Phase</p>
          <ToggleGroup
            value={phases}
            onValueChange={async values => {
              setPhases(values as Phase[])

              await updateNextPracticeWordCount({
                phases: values as Phase[],
              })
            }}
            type="multiple"
          >
            <ToggleGroupItem value={Phase.Learning}>Learning</ToggleGroupItem>
            <ToggleGroupItem value={Phase.Review}>Mastered</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="flex flex-col gap-1 items-start">
          <p className="text-muted-foreground text-sm">Practice type</p>
          <ToggleGroup
            value={practiceTypes}
            onValueChange={async values => {
              setPracticeTypes(values as PracticeSessionType[])

              await updateNextPracticeWordCount({
                practiceTypes: values as PracticeSessionType[],
              })
            }}
            type="multiple"
          >
            <ToggleGroupItem value={PracticeSessionType.New}>
              New
            </ToggleGroupItem>
            <ToggleGroupItem value={PracticeSessionType.Review}>
              Review
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="flex flex-col gap-1 items-start">
          <p className="text-muted-foreground text-sm">Words</p>
          <ToggleGroup
            value={wordCount}
            onValueChange={async value => {
              setWordCount(value)

              await updateNextPracticeWordCount({
                size: value === 'all' ? null : Number.parseInt(value, 10),
              })
            }}
            type="single"
          >
            <ToggleGroupItem value="10">10</ToggleGroupItem>
            <ToggleGroupItem value="25">25</ToggleGroupItem>
            <ToggleGroupItem value="50">50</ToggleGroupItem>
            <ToggleGroupItem value="100">100</ToggleGroupItem>
            <ToggleGroupItem value="all">All</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="flex w-full gap-2 flex-col">
          <Button
            onClick={() =>
              startSession({ phases, practiceTypes, userId, size })
            }
            disabled={phases.length === 0 || practiceTypes.length === 0}
            className="flex gap-2 grow"
          >
            <RocketIcon size={16} />
            Start
          </Button>
          <p className="text-xs text-muted-foreground">
            There are {nextPracticeWordCount} words in your next practice
            session
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
