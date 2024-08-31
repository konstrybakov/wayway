'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { WordSchema } from '@/prisma/zod/word'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChevronsUpDownIcon, CornerDownLeftIcon } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DifficultyCategory,
  FrequencyCategory,
  RegisterCategory,
} from '@prisma/client'

const AddWordFormSchema = WordSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
})
  .extend({
    description: z.string().optional(),
    difficultyCategory: z.nativeEnum(DifficultyCategory).optional(),
    frequencyCategory: z.nativeEnum(FrequencyCategory).optional(),
    registerCategory: z.nativeEnum(RegisterCategory).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.word.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Word must be at least 1 character long',
        path: ['word'],
      })
    }

    if (data.translation.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Translation must be at least 1 character long',
        path: ['translation'],
      })
    }
  })

type AddWordFormValues = z.infer<typeof AddWordFormSchema>

export const AddWordForm = () => {
  const form = useForm<AddWordFormValues>({
    resolver: zodResolver(AddWordFormSchema),
    defaultValues: {
      word: '',
      translation: '',
      description: '',
    },
  })

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
            <FormField
              control={form.control}
              name="word"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Word</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    The word in the language you are learning.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="translation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Translation</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    The translation of the word in your native language.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Collapsible>
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between space-x-4">
                  <p className="text-sm text-muted-foreground">
                    Additional fields (optional)
                  </p>
                  <Button type="button" variant="ghost" size="sm">
                    <ChevronsUpDownIcon className="size-4 text-muted-foreground" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-8">
                <div className="space-y-8">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description </FormLabel>
                        <FormControl>
                          <Textarea className="resize-none" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="difficultyCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Difficulty</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a difficulty" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(DifficultyCategory).map(
                                difficulty => (
                                  <SelectItem
                                    key={difficulty}
                                    value={difficulty}
                                  >
                                    {difficulty}
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="frequencyCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Frequency</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a frequency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(FrequencyCategory).map(
                                frequency => (
                                  <SelectItem key={frequency} value={frequency}>
                                    {frequency}
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="registerCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Register</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a register" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(RegisterCategory).map(register => (
                                <SelectItem key={register} value={register}>
                                  {register}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
            <Button type="submit" className="flex gap-3 items-center">
              Add word <CornerDownLeftIcon size={16} />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
