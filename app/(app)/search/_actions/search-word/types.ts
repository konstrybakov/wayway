import type { z } from 'zod'
import type { TranslationSchema } from './schema'

export interface Translation extends z.infer<typeof TranslationSchema> {}
