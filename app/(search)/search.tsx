'use client'

import type { Translation } from '@/app/(search)/actions/search-word/types'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { searchWord } from './actions/search-word'
import { Result } from './result'
import { SearchFormSubmitButton } from './search-form-submit-button'

type SearchProps = {
  userId: string
}

export function Search({ userId }: SearchProps) {
  const [input, setInput] = useState('')
  const [translation, setTranslation] = useState<Translation>()
  const [saved, setSaved] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center bg-background">
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
              placeholder="Enter a word to translate"
              className="flex-1"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <SearchFormSubmitButton disabled={!input} />
          </form>

          {translation && (
            <Result
              onSave={setSaved}
              saved={saved}
              userId={userId}
              translation={translation}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
