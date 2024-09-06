import { titleCase } from 'title-case'
import { categoriesAtom } from '@/app/(app)/(add-word)/state'
import type { AddWordFormValues, Category } from '@/app/(app)/(add-word)/types'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { FormField, FormItem, FormLabel } from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useAtom } from 'jotai'
import { CheckIcon, CirclePlusIcon, PlusIcon } from 'lucide-react'
import { useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { Badge } from '@/components/ui/badge'
import { useCommandState } from 'cmdk'

type ThematicCategorySelectProps = {
  form: UseFormReturn<AddWordFormValues>
}

const EmptyState = ({
  onAdd,
}: {
  onAdd: (name: string) => void
}) => {
  const search = useCommandState(state => state.search)

  return (
    <div
      onClick={() => onAdd(search)}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          onAdd(search)
        }
      }}
      className="relative flex gap-2 cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent"
    >
      <PlusIcon className="size-3" /> Add new category
    </div>
  )
}

export const ThematicCategorySelect = ({
  form,
}: ThematicCategorySelectProps) => {
  const [categories, setCategories] = useAtom(categoriesAtom)
  const [open, setOpen] = useState(false)

  const removeTCategory = (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>,
    category: Category,
  ) => {
    event.stopPropagation()

    const newCategories = form
      ?.getValues('category')
      ?.filter(c => c.id !== category.id)

    form.setValue('category', newCategories)
  }

  const addNewCategory = (name: string) => {
    setCategories([
      ...categories,
      {
        id: performance.now(),
        name,
        create: true,
      },
    ])
  }

  // TODO: combobox on desktop, drawer on mobile
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Thematic category{' '}
            <span className="text-xs text-muted-foreground">(max 2)</span>
          </FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <div className="flex items-center justify-between gap-2 p-1 pl-3 border rounded-md">
              {field.value?.map(category => (
                <Badge
                  className="cursor-pointer"
                  onClick={e => removeTCategory(e, category)}
                  key={category.id}
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      removeTCategory(e, category)
                    }
                  }}
                >
                  {titleCase(category.name)}
                </Badge>
              ))}
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  role="combobox"
                  size="sm"
                  className="justify-between ml-auto"
                >
                  <CirclePlusIcon className="size-4" />
                </Button>
              </PopoverTrigger>
            </div>
            <PopoverContent className="w-[200px] p-0" align="end">
              <Command>
                <CommandInput
                  placeholder="Search category..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty className="p-1">
                    <EmptyState onAdd={addNewCategory} />
                  </CommandEmpty>
                  <CommandGroup>
                    {categories.map(category => (
                      <CommandItem
                        className="flex items-center gap-2"
                        value={category.name}
                        key={category.id}
                        disabled={
                          field.value?.length === 2 &&
                          !field.value.some(c => c.id === category.id)
                        }
                        onSelect={() => {
                          let newCategories = [...(field.value || [])]

                          if (newCategories.some(c => c.id === category.id)) {
                            newCategories = newCategories.filter(
                              c => c.id !== category.id,
                            )
                          } else {
                            newCategories = [...newCategories, category]
                          }

                          form.setValue('category', newCategories)
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            'size-3',
                            field.value?.some(c => c.id === category.id)
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                        {titleCase(category.name)}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  )
}
