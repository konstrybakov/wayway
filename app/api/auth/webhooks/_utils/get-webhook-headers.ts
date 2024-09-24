import { l } from '@/lib/logger/logger'
import { headers } from 'next/headers'
import type { WebhookRequiredHeaders } from 'svix'

export const getWebhookHeaders = (): WebhookRequiredHeaders | never => {
  const log = l.child({ ctx: 'getWebhookHeaders' })

  const headerPayload = headers()

  const svixID = headerPayload.get('svix-id')
  const svixTimestamp = headerPayload.get('svix-timestamp')
  const svixSignature = headerPayload.get('svix-signature')

  if (!svixID || !svixTimestamp || !svixSignature) {
    log.error('Missing svix headers')

    throw new Error('Missing svix headers')
  }

  return {
    'svix-id': svixID,
    'svix-timestamp': svixTimestamp,
    'svix-signature': svixSignature,
  }
}
