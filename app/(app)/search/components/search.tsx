'use client'
import { searchWord } from '@/app/(app)/search/actions/search-word'
import type { Translation } from '@/app/(app)/search/actions/search-word/types'
import { Result } from '@/app/(app)/search/components/result'
import { SearchFormSubmitButton } from '@/app/(app)/search/components/search-form-submit-button'
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

type SearchProps = {
  userId: string
}

export function Search({ userId }: SearchProps) {
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
          Enter a word below and I'll provide the translation and examples.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <form
          className="flex items-center gap-4"
          action={async () => {
            const response = await searchWord(input, userId)

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
          />
          <SearchFormSubmitButton disabled={!input} />
        </form>

        {translation && (
          <Result
            key={translation.translation}
            onSave={setSaved}
            saved={saved}
            userId={userId}
            translation={translation}
          />
        )}
      </CardContent>
    </Card>
  )
}
