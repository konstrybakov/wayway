import { l } from '@/lib/logger/logger'
import type { WebhookEvent } from '@clerk/nextjs/server'

export const handleUserCreated = async (event: WebhookEvent) => {
  const log = l.child({ event: event.type, ctx: 'handleUserCreated' })

  if (event.type !== 'user.created') {
    log.error('Mismatch between event type and handler')

    throw new Error('Mismatch between event type and handler')
  }

  const user = event.data
  const emailEntry = user.email_addresses.find(
    email => email.id === user.primary_email_address_id,
  )

  if (!emailEntry) {
    log.error('Primary user email not found')

    throw new Error('Primary user email not found')
  }

  // await prisma.user.create({
  //   data: {
  //     id: user.id,
  //     email: emailEntry.email_address,
  //     firstName: user.first_name,
  //     lastName: user.last_name,
  //     profileImageUrl: user.image_url,
  //     createdAt: new Date(user.created_at),
  //   },
  //   ...SELECT_NONE,
  // })
}
