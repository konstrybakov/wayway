import { type TransportTargetOptions, pino } from 'pino'

const targets: TransportTargetOptions[] = []

targets.push({
  target: 'pino-pretty',
  options: {
    colorize: true,
  },
})

export const transport = pino.transport({
  targets,
})

export const logger = pino(
  {
    level: process.env.LOG_LEVEL || 'info',
  },
  transport,
)
