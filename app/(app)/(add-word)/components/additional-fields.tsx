import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { ChevronsUpDownIcon } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'
import type { AddWordFormValues } from '../types'

import {
  DifficultyCategory,
  FrequencyCategory,
  RegisterCategory,
} from '@prisma/client'
import { DescriptionField } from './description-field'
import { CategorySelect } from './category-select'

type AdditionalFieldsProps = {
  form: UseFormReturn<AddWordFormValues>
}

export const AdditionalFields = ({ form }: AdditionalFieldsProps) => (
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
        <DescriptionField form={form} />
        <div className="grid grid-cols-3 gap-4">
          <CategorySelect
            form={form}
            name="difficultyCategory"
            label="Difficulty"
            placeholder="Select a difficulty"
            options={Object.values(DifficultyCategory)}
          />
          <CategorySelect
            form={form}
            name="frequencyCategory"
            label="Frequency"
            placeholder="Select a frequency"
            options={Object.values(FrequencyCategory)}
          />
          <CategorySelect
            form={form}
            name="registerCategory"
            label="Register"
            placeholder="Select a register"
            options={Object.values(RegisterCategory)}
          />
        </div>
      </div>
    </CollapsibleContent>
  </Collapsible>
)
