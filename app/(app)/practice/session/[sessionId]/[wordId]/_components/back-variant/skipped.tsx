import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CircleXIcon, CornerDownLeftIcon } from 'lucide-react'
import { useHotkeys } from 'react-hotkeys-hook'
import { Grade } from '../../_actions/process-word/utils'
import { usePracticeCardContext } from '../practice-card-context'

export const BackSkipped = () => {
  const { practice, word } = usePracticeCardContext()

  useHotkeys('enter', () => {
    practice(Grade.Partial)
  })

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex gap-2 items-center">
          <CircleXIcon className="text-orange-700" />
          <p className="text-orange-700">Skipped!</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 grid-cols-1">
        <div>
          <p className="text-2xl font-semibold">{word.word}</p>
          <p className="text-lg text-muted-foreground">{word.translation}</p>
        </div>
        <div className="grid gap-5">
          {word.examples.map(example => {
            return (
              <div key={example.original} className="flex flex-col gap-1">
                <p className="font-xs">{example.original}</p>
                <p className="text-muted-foreground text-sm">
                  {example.translation}
                </p>
              </div>
            )
          })}
        </div>
        <div className="flex gap-2 items-center justify-end">
          <Button
            className="flex gap-3 bg-stone-800"
            onClick={() => practice(Grade.Partial)}
          >
            Next
            <CornerDownLeftIcon size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
