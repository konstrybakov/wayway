import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ArrowBigUpIcon,
  CircleCheckIcon,
  CornerDownLeftIcon,
} from 'lucide-react'
import { useHotkeys } from 'react-hotkeys-hook'
import { Grade } from '../../actions/process-word/utils'
import { usePracticeCardContext } from '../practice-card-context'

export const BackCorrect = () => {
  const { practice, word } = usePracticeCardContext()

  useHotkeys('enter', () => {
    practice(Grade.Remembered)
  })

  useHotkeys('shift+enter', () => {
    practice(Grade.Easy)
  })

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex gap-2 items-center">
          <CircleCheckIcon className="text-emerald-700" />
          <p className="text-emerald-700">Correct!</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 grid-cols-2">
        <div>
          <p className="text-2xl font-semibold">{word.word}</p>
          <p className="text-lg text-muted-foreground">{word.translation}</p>
        </div>
        <div className="flex gap-2 col-span-2 items-center justify-end">
          <Button
            className="flex gap-3 bg-stone-800"
            onClick={() => practice(Grade.Remembered)}
          >
            Remembered
            <CornerDownLeftIcon size={16} />
          </Button>
          <Button
            variant="outline"
            className="flex gap-3 bg-stone-50 hover:bg-stone-100"
            onClick={() => practice(Grade.Easy)}
          >
            Easy
            <div className="flex">
              <ArrowBigUpIcon size={16} />
              <CornerDownLeftIcon size={16} />
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
