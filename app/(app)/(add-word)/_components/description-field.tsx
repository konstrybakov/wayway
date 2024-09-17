import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import type { UseFormReturn } from 'react-hook-form'
import type { AddWordFormValues } from '../types'

interface DescriptionFieldProps {
  form: UseFormReturn<AddWordFormValues>
}

export const DescriptionField = ({ form }: DescriptionFieldProps) => (
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
)
