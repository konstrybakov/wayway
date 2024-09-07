import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { CircleXIcon, CornerDownLeftIcon } from 'lucide-react'
import { useHotkeys } from 'react-hotkeys-hook'
import { usePracticeCardContext } from '../practice-card-context'
import { Grade } from '../../actions/process-word/utils'

export const BackSkipped = () => {
  const { practice, word, translation } = usePracticeCardContext()

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
      <CardContent className="grid gap-6 grid-cols-2">
        <div>
          <p className="text-2xl font-semibold">{word}</p>
          <p className="text-lg text-muted-foreground">{translation}</p>
        </div>
        <div className="flex gap-2 col-span-2 items-center justify-end">
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
