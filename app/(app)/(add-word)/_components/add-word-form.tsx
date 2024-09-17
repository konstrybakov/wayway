'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CornerDownLeftIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { AddWordFormSchema } from '../schemas'
import type { AddWordFormValues, Category } from '../types'

import {
  DifficultyCategory,
  FrequencyCategory,
  RegisterCategory,
} from '@prisma/client'
import { toast } from 'sonner'
import { actionCreateWord } from '../_actions/create-word'
import { AdditionalFields } from './additional-fields'
import { CategorySelect } from './category-select'
import { DescriptionField } from './description-field'
import { ThematicCategorySelect } from './thematic-category-select'
import { WordInput } from './word-input'

interface AddWordFormProps {
  categories: Category[]
}

export const AddWordForm = ({ categories }: AddWordFormProps) => {
  const form = useForm<AddWordFormValues>({
    resolver: zodResolver(AddWordFormSchema),
    defaultValues: {
      word: '',
      translation: '',
      description: '',
    },
  })

  const onSubmit = async (formValues: AddWordFormValues) => {
    const response = await actionCreateWord(formValues)

    if (response.success) {
      toast.success('Word created')

      form.reset()
    } else {
      toast.error('Error creating word')
    }
  }

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Add word</CardTitle>
        <CardDescription>
          Here, you can add a word and I'll save it to your dictionary.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <WordInput
              form={form}
              name="word"
              label="Word"
              description="The word in the language you are learning."
            />
            <WordInput
              form={form}
              name="translation"
              label="Translation"
              description="The translation of the word in your native language."
            />
            <AdditionalFields>
              <ThematicCategorySelect categories={categories} form={form} />
              <DescriptionField form={form} />
              <div className="grid grid-cols-3 gap-4">
                <CategorySelect
                  form={form}
                  name="difficultyCategory"
                  label="Difficulty"
                  options={Object.values(DifficultyCategory)}
                />
                <CategorySelect
                  form={form}
                  name="frequencyCategory"
                  label="Frequency"
                  options={Object.values(FrequencyCategory)}
                />
                <CategorySelect
                  form={form}
                  name="registerCategory"
                  label="Register"
                  options={Object.values(RegisterCategory)}
                />
              </div>
            </AdditionalFields>

            <Button type="submit" className="flex gap-3 items-center">
              Add word <CornerDownLeftIcon size={16} />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
