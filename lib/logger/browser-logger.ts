import { pino } from 'pino'

export const bl = pino({
  level: process.env.LOG_LEVEL || 'info',
  browser: {
    asObject: true,
  },
})
