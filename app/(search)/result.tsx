import { saveWord } from '@/app/(search)/actions/save-word'
import type { Translation } from '@/app/(search)/actions/search-word/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { AccessibleIcon } from '@radix-ui/react-accessible-icon'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { SaveIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { titleCase } from 'title-case'
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert'

type ResultProps = {
  translation: Translation
}

export const Result = ({ translation }: ResultProps) => {
  const [baseLoading, setBaseLoading] = useState(false)
  const [originalLoading, setOriginalLoading] = useState(false)
  const alreadyInBaseForm = translation.correctOriginal === translation.baseForm

  const handleSaveWord = async (form: 'base' | 'original') => {
    try {
      if (form === 'base') {
        setBaseLoading(true)
      } else {
        setOriginalLoading(true)
      }

      await saveWord(translation, form)

      if (form === 'base') {
        setBaseLoading(false)
      } else {
        setOriginalLoading(false)
      }

      toast.success('Saved the word to your collection')
    } catch (error) {
      console.error(error)
      toast.error('Failed to save the word')
    }
  }

  return (
    <div className="space-y-8">
      {translation.error && (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{translation.error}</AlertDescription>
        </Alert>
      )}
      <div className="flex items-center mt-10 flex-wrap justify-between">
        <div className="flex items-center gap-4">
          <h4 className="text-lg font-medium">
            {translation.baseTranslation}{' '}
          </h4>
          <Badge variant="secondary">{translation.partOfSpeech}</Badge>
        </div>
        <div className="flex items-center gap-4">
          <h4 className="text-lg font-medium">{translation.baseForm}</h4>
          <Button
            onClick={() => handleSaveWord('base')}
            variant="secondary"
            size="icon"
            loading={baseLoading}
            disabled={baseLoading}
          >
            <AccessibleIcon label="Save base word">
              <SaveIcon size={16} />
            </AccessibleIcon>
          </Button>
        </div>
      </div>
      <Separator />
      {alreadyInBaseForm ? null : (
        <>
          <div className="flex items-center flex-wrap justify-between">
            <div className="flex items-center gap-4">
              <h4 className="text-lg font-medium">
                {translation.translation}{' '}
              </h4>
              <Badge variant="secondary">{translation.partOfSpeech}</Badge>
            </div>
            <div className="flex items-center gap-4">
              <h4 className="text-lg font-medium">
                {translation.correctOriginal}
              </h4>
              <Button
                onClick={() => handleSaveWord('original')}
                variant="secondary"
                size="icon"
                loading={originalLoading}
                disabled={originalLoading}
              >
                <AccessibleIcon label="Save original word">
                  <SaveIcon size={16} />
                </AccessibleIcon>
              </Button>
            </div>
          </div>
          <Separator />
        </>
      )}
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm ">
          {translation.description}
        </p>
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2">
            {translation.thematicCategory.map(category => (
              <Badge key={category}>{titleCase(category)}</Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <Badge variant="outline">
              {titleCase(translation.difficultyCategory)}
            </Badge>
            <Badge variant="outline">
              {titleCase(translation.frequencyCategory)}
            </Badge>
            <Badge variant="outline">
              {titleCase(translation.registerCategory)}
            </Badge>
          </div>
        </div>
      </div>
      <Separator />
      <div className="grid gap-4">
        {translation.examples.map(example => {
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
    </div>
  )
}
