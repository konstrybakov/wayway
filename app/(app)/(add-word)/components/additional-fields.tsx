import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronsUpDownIcon } from 'lucide-react'

import {} from '@prisma/client'
import type { PropsWithChildren } from 'react'

export const AdditionalFields = ({ children }: PropsWithChildren) => (
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
    <CollapsibleContent className="space-y-8">{children}</CollapsibleContent>
  </Collapsible>
)
