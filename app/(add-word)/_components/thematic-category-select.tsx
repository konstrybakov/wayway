import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { UseFormReturn } from 'react-hook-form'
import { titleCase } from 'title-case'
import type { AddWordFormValues, Category } from '../_common/types'

interface ThematicCategorySelectProps {
  form: UseFormReturn<AddWordFormValues>
  categories: Category[]
}

export const ThematicCategorySelect = ({
  form,
  categories,
}: ThematicCategorySelectProps) => {
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Thematic category</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value?.toString()}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.name}>
                  {titleCase(category.name)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
