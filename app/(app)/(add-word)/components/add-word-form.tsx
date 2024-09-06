'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { CornerDownLeftIcon } from 'lucide-react'
import { AddWordFormSchema } from '../schemas'
import type { AddWordFormValues, Category } from '../types'

import { AdditionalFields } from './additional-fields'
import { WordInput } from './word-input'
import { categoriesAtom } from '@/app/(app)/(add-word)/state'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

type AddWordFormProps = {
  categories: Category[]
}

export const AddWordForm = ({ categories }: AddWordFormProps) => {
  const setCategories = useSetAtom(categoriesAtom)
  const form = useForm<AddWordFormValues>({
    resolver: zodResolver(AddWordFormSchema),
    defaultValues: {
      word: '',
      translation: '',
      description: '',
    },
  })

  // TODO: evaluate if this is needed
  useEffect(() => {
    setCategories(categories)
  }, [categories, setCategories])

  const onSubmit = (values: AddWordFormValues) => {
    console.log(values)
  }

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Add word</CardTitle>
        <CardDescription>
          Enter a word below and I'll add it to your dictionary.
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
            <AdditionalFields form={form} />
            <Button type="submit" className="flex gap-3 items-center">
              Add word <CornerDownLeftIcon size={16} />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
