interface Config {
  learningSteps: number[]
  intervalMultiplier: number
  easyBonus: number
  lapseIntervalMultiplier: number
}

const TEN_MINUTES = 10
const TWO_HOURS = 2 * 60
const ONE_DAY = 1 * 24 * 60
const THREE_DAYS = 3 * 24 * 60

export enum Grade {
  Forgot = 0,
  Partial = 1,
  Remembered = 2,
  Easy = 3,
}

export const config = {
  learningSteps: [TEN_MINUTES, TWO_HOURS, ONE_DAY, THREE_DAYS],
  intervalMultiplier: 1,
  easyBonus: 1.3,
  lapseIntervalMultiplier: 0.1,
} satisfies Config
