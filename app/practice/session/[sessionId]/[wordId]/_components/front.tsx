import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowBigUpIcon, CornerDownLeftIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { skippedInput } from '../_utils/input-symbols'
import { usePracticeCardContext } from './practice-card-context'

export const Front = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { setInput, word } = usePracticeCardContext()
  const [localInput, setLocalInput] = useState('')

  useHotkeys('f', event => {
    event.preventDefault()

    inputRef.current?.focus()
  })

  useHotkeys(
    'shift+enter',
    () => {
      setInput(skippedInput)
    },
    { enableOnFormTags: ['INPUT'] },
  )

  const INPUT_NAME = 'guess'

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="justify-between text-2xl font-bold flex items-center gap-2">
          <span className="flex gap-2 items-center">
            {word.translation} <Badge variant="secondary">{word.pos}</Badge>
          </span>
          <span className="flex gap-2">
            {word.categories.map(category => (
              <Badge key={category.name} variant="secondary">
                {category.name}
              </Badge>
            ))}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 items-center">
        <form
          onSubmit={event => {
            event.preventDefault()

            setInput(localInput)
          }}
          className="grid gap-2"
        >
          <Label htmlFor="word" className="text-muted-foreground">
            Enter the original word:
          </Label>
          <div className="flex items-center space-x-2">
            <Input
              autoFocus
              autoCorrect="off"
              onChange={event => setLocalInput(event.target.value)}
              value={localInput}
              id="word"
              ref={inputRef}
              name={INPUT_NAME}
              type="text"
              maxLength={100} // TODO: think about reasonable max length
              className="flex-1"
            />
            <Button
              type="submit"
              className="flex gap-3 items-center bg-stone-800"
            >
              Check
              <CornerDownLeftIcon size={16} />
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                setInput(skippedInput)
              }}
              className="flex gap-3 bg-stone-50 hover:bg-stone-100"
            >
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
