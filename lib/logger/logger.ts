import { pino } from 'pino'

export const l = pino({ level: process.env.LOG_LEVEL || 'info' })
