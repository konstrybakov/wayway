import type { ReasonPhrases, StatusCodes } from 'http-status-codes'

interface BaseActionResponse {
  status: StatusCodes
  statusPhrase: ReasonPhrases
}

export type ActionResponse<T> =
  | (BaseActionResponse & {
      success: true
      data: T
    })
  | (BaseActionResponse & {
      success: false
      error: string
    })

export type ActionResponsePromise<T> = Promise<ActionResponse<T>>
