import { l } from '@/lib/logger/logger'
import type { WebhookEvent } from '@clerk/nextjs/server'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'
import { Webhook, type WebhookRequiredHeaders } from 'svix'
import { webhookEventHandlers } from './_lib/webhook-event-handlers'
import { getWebhookHeaders } from './_utils/get-webhook-headers'

export async function POST(request: Request) {
  const log = l.child({ ctx: 'POST /api/auth/webhooks' })

  const secret = process.env.CLERK_WEBHOOK_SECRET

  if (!secret) {
    log.error('Missing CLERK_WEBHOOK_SECRET')

    throw new Error('Missing CLERK_WEBHOOK_SECRET')
  }

  let webhookHeaders: WebhookRequiredHeaders

  try {
    webhookHeaders = getWebhookHeaders()
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error getting webhook headers'

    log.error(error, errorMessage)

    return new NextResponse(errorMessage, {
      status: StatusCodes.BAD_REQUEST,
      statusText: ReasonPhrases.BAD_REQUEST,
    })
  }

  const body = await request.text()
  const webhook = new Webhook(secret)

  let event: WebhookEvent

  try {
    event = webhook.verify(body, webhookHeaders) as WebhookEvent
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error verifying webhook'

    log.error(error, errorMessage)

    return new NextResponse(errorMessage, {
      status: StatusCodes.BAD_REQUEST,
      statusText: ReasonPhrases.BAD_REQUEST,
    })
  }

  log.debug({ event }, 'Webhook event')

  const handler = webhookEventHandlers.get(event.type)

  if (!handler) {
    const warningMessage = `No handler for webhook event: ${event.type}`

    log.warn({ event: event.type }, warningMessage)

    return new NextResponse(warningMessage, {
      status: StatusCodes.OK,
      statusText: ReasonPhrases.OK,
    })
  }

  try {
    await handler(event)
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error handling webhook event'

    log.error(error, errorMessage)

    return new NextResponse(errorMessage, {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusText: ReasonPhrases.INTERNAL_SERVER_ERROR,
    })
  }

  return new NextResponse('Webhook event handled', {
    status: StatusCodes.OK,
    statusText: ReasonPhrases.OK,
  })
}
