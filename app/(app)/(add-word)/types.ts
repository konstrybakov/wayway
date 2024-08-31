import type { z } from 'zod'
import type { AddWordFormSchema } from './schemas'

export type AddWordFormValues = z.infer<typeof AddWordFormSchema>
