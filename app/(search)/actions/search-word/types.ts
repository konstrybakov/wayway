import type { z } from 'zod'
import type { TranslationSchema } from './schema'

export type Translation = z.infer<typeof TranslationSchema>
