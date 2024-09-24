import type { WebhookEventType, WebhookEvent } from '@clerk/nextjs/server'
import { handleUserCreated } from './handle-user-created'
import { handleUserDeleted } from './handle-user-deleted'
import { handleUserUpdated } from './handle-user-updated'

const webhookEventHandlers: Map<
  WebhookEventType,
  (event: WebhookEvent) => Promise<void>
> = new Map()

webhookEventHandlers.set('user.created', handleUserCreated)
webhookEventHandlers.set('user.updated', handleUserUpdated)
webhookEventHandlers.set('user.deleted', handleUserDeleted)

export { webhookEventHandlers }
