import { prisma } from '@/lib/db/client'
import { SELECT_NONE } from '@/lib/db/select-none'
import { l } from '@/lib/logger/logger'
import type { WebhookEvent } from '@clerk/nextjs/server'

export const handleUserDeleted = async (event: WebhookEvent) => {
  const log = l.child({ event: event.type, ctx: 'handleUserDeleted' })

  if (event.type !== 'user.deleted') {
    log.error('Mismatch between event type and handler')

    throw new Error('Mismatch between event type and handler')
  }

  const user = event.data

  await prisma.user.delete({
    where: { id: user.id },
    ...SELECT_NONE,
  })
}
