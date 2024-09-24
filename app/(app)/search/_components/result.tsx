import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { bl } from '@/lib/logger/browser-logger'
import { AccessibleIcon } from '@radix-ui/react-accessible-icon'
import { CircleAlertIcon, PencilIcon, SaveIcon } from 'lucide-react'
import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { toast } from 'sonner'
import { titleCase } from 'title-case'
import { saveWord } from '../_actions/save-word'
import type { Translation } from '../_actions/search-word/types'

interface ResultProps {
  translation: Translation
  saved: boolean
  onSave: (saved: boolean) => void
}

export const Result = ({ translation, saved }: ResultProps) => {
  const [baseSaved, setBaseSaved] = useState(saved)
  const [originalSaved, setOriginalSaved] = useState(false)
  const [baseEditing, setBaseEditing] = useState(false)
  const [originalEditing, setOriginalEditing] = useState(false)
  const [baseLoading, setBaseLoading] = useState(false)
  const [originalLoading, setOriginalLoading] = useState(false)
  const [baseTranslation, setBaseTranslation] = useState(
    translation.baseTranslation,
  )
  const [originalTranslation, setOriginalTranslation] = useState(
    translation.translation,
  )
  const alreadyInBaseForm =
    translation.correctOriginal.toLocaleLowerCase() ===
    translation.baseForm.toLocaleLowerCase()

  const handleEditWord = (form: 'base' | 'original') => {
    if (form === 'base') {
      setBaseEditing(true)
    } else {
      setOriginalEditing(true)
    }
  }

  const handleSaveWord = async (form: 'base' | 'original') => {
    try {
      form === 'base' ? setBaseLoading(true) : setOriginalLoading(true)

      await saveWord(
        { ...translation, baseTranslation, translation: originalTranslation },
        form,
      )

      if (form === 'base') {
        setBaseLoading(false)
        setBaseSaved(true)
      } else {
        setOriginalLoading(false)
        setOriginalSaved(true)
      }

      setBaseEditing(false)
      setOriginalEditing(false)

      toast.success('Saved the word to your collection')
    } catch (error) {
      bl.error('Failed to save the word', {
        translation,
        error,
      })
      toast.error('Failed to save the word')
    }
  }

  useHotkeys('ctrl+s', () => handleSaveWord('base'), {
    enableOnFormTags: ['INPUT'],
  })
  useHotkeys('ctrl+shift+s', () => handleSaveWord('original'), {
    enableOnFormTags: ['INPUT'],
  })
  useHotkeys('ctrl+e', () => handleEditWord('base'), {
    enableOnFormTags: ['INPUT'],
  })
  useHotkeys('ctrl+shift+e', () => handleEditWord('original'), {
    enableOnFormTags: ['INPUT'],
  })

  return (
    <div className="space-y-8">
      {translation.error && (
        <Alert variant="destructive">
          <CircleAlertIcon size={16} />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{translation.error}</AlertDescription>
        </Alert>
      )}
      <div className="flex items-center mt-10 flex-wrap justify-between">
        <div className="flex items-center gap-2">
          {baseEditing ? (
            <Input
              value={baseTranslation}
              onChange={event => setBaseTranslation(event.target.value)}
            />
          ) : (
            <h4 className="text-lg font-medium">{baseTranslation} </h4>
          )}

          <Badge variant="secondary">{translation.partOfSpeech}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <h4 className="text-lg font-medium">{translation.baseForm}</h4>
          <Button
            onClick={() => handleEditWord('base')}
            variant="secondary"
            size="icon"
            loading={baseLoading}
            disabled={baseLoading || baseSaved || baseEditing}
          >
            <AccessibleIcon label="Edit base word">
              <PencilIcon size={16} />
            </AccessibleIcon>
          </Button>
          <Button
            onClick={() => handleSaveWord('base')}
            variant="secondary"
            size="icon"
            loading={baseLoading}
            disabled={baseLoading || baseSaved}
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
            <div className="flex items-center gap-2">
              {originalEditing ? (
                <Input
                  value={originalTranslation}
                  onChange={event => setOriginalTranslation(event.target.value)}
                />
              ) : (
                <h4 className="text-lg font-medium">{originalTranslation} </h4>
              )}
              <Badge variant="secondary">{translation.partOfSpeech}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-medium">
                {translation.correctOriginal}
              </h4>
              <Button
                onClick={() => handleEditWord('original')}
                variant="secondary"
                size="icon"
                loading={originalLoading}
                disabled={originalLoading || originalSaved || originalEditing}
              >
                <AccessibleIcon label="Edit original word">
                  <PencilIcon size={16} />
                </AccessibleIcon>
              </Button>
              <Button
                onClick={() => handleSaveWord('original')}
                variant="secondary"
                size="icon"
                loading={originalLoading}
                disabled={originalLoading || originalSaved}
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
        {translation.description && (
          <p className="text-muted-foreground text-sm ">
            {translation.description}
          </p>
        )}
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2">
            {translation.thematicCategory.map(category => (
              <Badge variant="secondary" key={category}>
                {titleCase(category)}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            {translation.difficultyCategory && (
              <Badge variant="outline">
                {titleCase(translation.difficultyCategory)}
              </Badge>
            )}
            {translation.frequencyCategory && (
              <Badge variant="outline">
                {titleCase(translation.frequencyCategory)}
              </Badge>
            )}
            {translation.registerCategory && (
              <Badge variant="outline">
                {titleCase(translation.registerCategory)}
              </Badge>
            )}
          </div>
        </div>
      </div>
      <Separator />
      <div className="grid gap-5">
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
