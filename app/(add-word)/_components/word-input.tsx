import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { UseFormReturn } from 'react-hook-form'
import type { AddWordFormValues } from '../_common/types'

interface WordInputProps {
  form: UseFormReturn<AddWordFormValues>
  name: 'word' | 'translation'
  label: string
  description: string
}

export const WordInput = ({
  form,
  name,
  label,
  description,
}: WordInputProps) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormDescription>{description}</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
)
