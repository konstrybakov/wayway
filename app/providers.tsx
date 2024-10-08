'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import type { PropsWithChildren } from 'react'

const posthogDisabled = process.env.NEXT_PUBLIC_POSTHOG_DISABLED === 'true'

if (!posthogDisabled) {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    throw new Error('NEXT_PUBLIC_POSTHOG_KEY env variable is not set')
  }

  if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: 'identified_only',
    })
  }
}

export function CSPostHogProvider({ children }: PropsWithChildren) {
  return posthogDisabled ? (
    children
  ) : (
    <PostHogProvider client={posthog}>{children}</PostHogProvider>
  )
}
