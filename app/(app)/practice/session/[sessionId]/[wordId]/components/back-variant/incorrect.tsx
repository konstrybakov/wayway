import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowBigUpIcon, CircleXIcon, CornerDownLeftIcon } from 'lucide-react'
import { useHotkeys } from 'react-hotkeys-hook'
import { Grade } from '../../actions/process-word/utils'
import { usePracticeCardContext } from '../practice-card-context'

interface BackIncorrectProps {
  input: string
}

export const BackIncorrect = ({ input }: BackIncorrectProps) => {
  const { word, practice } = usePracticeCardContext()

  useHotkeys('enter', () => {
    practice(Grade.Forgot)
  })

  useHotkeys('shift+enter', () => {
    practice(Grade.Partial)
  })

  return (
    <Card className="w-full max-w-xl transition-all mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex gap-2 items-center">
          <CircleXIcon className="text-rose-700" />
          <p className="text-rose-700">Wrong!</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 grid-cols-2">
        <div>
          <p className="text-2xl font-semibold">{word.word}</p>
          <p className="text-lg text-muted-foreground">{word.translation}</p>
        </div>
        <p className="text-rose-700 justify-self-end text-lg font-medium">
          {input}
        </p>
        <div className="flex gap-2 col-span-2 items-center justify-end">
          <Button
            className="flex gap-3 bg-stone-800"
            onClick={() => practice(Grade.Forgot)}
          >
            Forgot
            <CornerDownLeftIcon size={16} />
          </Button>
          <Button
            className="flex gap-3 bg-stone-50 hover:bg-stone-100"
            variant="outline"
            onClick={() => practice(Grade.Partial)}
          >
            Partial
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
