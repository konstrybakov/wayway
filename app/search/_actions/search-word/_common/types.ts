import type { z } from 'zod'
import type { TranslationSchema } from './schemas'

export interface Translation extends z.infer<typeof TranslationSchema> {}
