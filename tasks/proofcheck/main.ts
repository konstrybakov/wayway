import { type Result, ResultAsync } from 'neverthrow'
import { Sanakirja } from './sanakirja'
import { fetchCategories } from '@/lib/data/fetch-categories'
import type { WordToProofcheck } from './db/types'
import { getProofcheckResults } from './llm/get-proofcheck-results'
import { fetchWordsToProofcheck } from './db/fetch-words-to-proofcheck'
import { sleep } from 'bun'
import { logger as pinoLogger } from '@/lib/logger'
import { save } from './db/save'
import { DatabaseError } from '@/lib/errors/database'
import { AutomationError } from '@/lib/errors/automation'
import { OpenAIError } from '@/lib/errors/open-ai'
import { markSkipped } from './db/mark-skipped'
import { PAGE_SIZE, SLEEP_DURATION } from './constants'
import { getDictCredentials } from './get-dict-credentials'

const main = async () => {
  const logger = pinoLogger.child({
    task: 'proofcheck',
  })

  const { dictionaryUrl, dictionaryUsername, dictionaryPassword } =
    getDictCredentials()

  const dictionary = new Sanakirja(
    dictionaryUrl,
    dictionaryUsername,
    dictionaryPassword,
  )

  logger.debug('Starting proofcheck')

  let page = 1
  let words: Result<WordToProofcheck[], DatabaseError>

  const categories = await ResultAsync.fromPromise(
    fetchCategories(),
    error =>
      new DatabaseError(
        'Failed to fetch categories',
        error instanceof Error ? error : new Error(String(error)),
      ),
  )

  if (categories.isErr()) {
    logger.error(categories.error)

    process.exitCode = 1

    return
  }

  logger.debug(
    {
      categoriesCount: categories.value.length,
    },
    'Fetched categories',
  )

  do {
    logger.debug({ page }, 'Fetching words')

    words = await ResultAsync.fromPromise(
      fetchWordsToProofcheck(page, PAGE_SIZE),
      error =>
        new DatabaseError(
          'Failed to fetch words',
          error instanceof Error ? error : new Error(String(error)),
        ),
    )

    if (words.isErr()) {
      logger.error(words.error)

      process.exitCode = 1

      return
    }

    logger.debug(
      {
        wordsCount: words.value.length,
      },
      'Fetched words',
    )

    const skippedWords: WordToProofcheck['id'][] = []

    for (const word of words.value) {
      const startTime = performance.now()
      const definitions = await ResultAsync.fromPromise(
        dictionary.getWordDefinitions(word.word),
        error =>
          new AutomationError(
            'Failed to get word definitions',
            error instanceof Error ? error : new Error(String(error)),
          ),
      )

      if (definitions.isErr()) {
        logger.error(definitions.error)
        logger.warn({ word: word.word }, 'Skipping word')

        skippedWords.push(word.id)

        continue
      }

      const proofcheckResults = await ResultAsync.fromPromise(
        getProofcheckResults(definitions.value, categories.value),
        error =>
          new OpenAIError(
            'Failed to get proofcheck results',
            error instanceof Error ? error : new Error(String(error)),
          ),
      )

      if (proofcheckResults.isErr()) {
        logger.error(proofcheckResults.error)
        logger.warn({ word: word.word }, 'Skipping word')

        skippedWords.push(word.id)

        continue
      }

      await ResultAsync.fromPromise(
        save(word, proofcheckResults.value),
        error =>
          new DatabaseError(
            'Failed to save proofcheck results',
            error instanceof Error ? error : new Error(String(error)),
          ),
      )

      const endTime = performance.now()
      const time = `${(endTime - startTime) / 1000}s`

      logger.debug(
        { wordProofcheckTime: time, word: word.word },
        'Proofcheck time',
      )

      // to not get blocked. a strong no-no, but while I am waiting for my API key and to check the solution - this will work
      await sleep(SLEEP_DURATION)
    }

    page++

    if (skippedWords.length) {
      const result = await ResultAsync.fromPromise(
        markSkipped(skippedWords),
        error =>
          new DatabaseError(
            'Failed to mark words as skipped',
            error instanceof Error ? error : new Error(String(error)),
          ),
      )

      result.match(logger.debug, logger.error)
    }
  } while (words.value.length > 0)

  const closeDictionary = await ResultAsync.fromPromise(
    dictionary.close(),
    error =>
      new AutomationError(
        'Failed to gracefully close the dictionary',
        error instanceof Error ? error : new Error(String(error)),
      ),
  )

  closeDictionary.match(logger.debug, logger.error)

  logger.debug('Proofcheck finished')
}

await main()
