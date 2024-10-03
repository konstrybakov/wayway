'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

import { searchWord } from '../_actions/search-word'
import type { Translation } from '../_actions/search-word/_common/types'
import { Result } from './result'
import { SearchFormSubmitButton } from './search-form-submit-button'

export function Search() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [input, setInput] = useState('')
  const [translation, setTranslation] = useState<Translation>()
  const [saved, setSaved] = useState(false)

  useHotkeys('f', event => {
    event.preventDefault()

    inputRef.current?.focus()
  })

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Find word</CardTitle>
        <CardDescription>
          Hey, if you search for a word, you might get a translation. Might not.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <form
          className="flex items-center gap-4"
          action={async () => {
            const response = await searchWord(input)

            setTranslation(response.translation)
            setSaved(response.saved)
          }}
        >
          <Input
            type="text"
            ref={inputRef}
            placeholder="Enter a word to translate"
            className="flex-1"
            value={input}
            onChange={e => setInput(e.target.value)}
            maxLength={100} // TODO: think about reasonable max length
          />
          <SearchFormSubmitButton disabled={!input} />
        </form>

        {translation && (
          <Result
            key={translation.translation}
            onSave={setSaved}
            saved={saved}
            translation={translation}
          />
        )}
      </CardContent>
    </Card>
  )
}
