'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAtom, useSetAtom } from 'jotai'

import { ArrowBigUpIcon, CornerDownLeftIcon } from 'lucide-react'
import { guessAtom } from './state/guess-atom'
import { submittedAtom } from './state/submitted-atom'

const INPUT_NAME = 'guess'

type WordCardFrontProps = {
  word: string
}

export const WordCardFront = ({ word }: WordCardFrontProps) => {
  const [guess, setGuess] = useAtom(guessAtom)
  const setSubmitted = useSetAtom(submittedAtom)

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{word}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 min-h-24 items-center">
        <form
          onSubmit={event => {
            event.preventDefault()

            setSubmitted(true)
          }}
          className="grid gap-2"
        >
          <Label htmlFor="word" className="text-muted-foreground">
            Enter the original word:
          </Label>
          <div className="flex items-center space-x-2">
            <Input
              autoFocus
              onChange={event => setGuess(event.target.value)}
              value={guess}
              id="word"
              name={INPUT_NAME}
              type="text"
              className="flex-1"
            />
            <Button type="submit" className="flex gap-3 items-center">
              Check
              <CornerDownLeftIcon size={16} />
            </Button>
            <Button variant="outline" type="submit" className="flex gap-3">
              No Idea
              <div className="flex">
                <ArrowBigUpIcon size={16} />
                <CornerDownLeftIcon size={16} />
              </div>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
