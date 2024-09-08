import { anthropic } from '@ai-sdk/anthropic'
import { openai } from '@ai-sdk/openai'

export const modelA = anthropic('claude-3-5-sonnet-20240620')
export const modelO = openai('gpt-4o-mini-2024-07-18')
