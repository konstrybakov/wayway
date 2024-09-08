import { Sanakirja } from './sanakirja'
import { fetchCategories } from '@/lib/data/fetch-categories'
import type { WordsToProofcheck } from './types'
import { getProofcheckResults } from './llm/get-proofcheck-results'
import { fetchWordsToProofcheck } from './fetch-words-to-proofcheck'
import { sleep } from 'bun'
import { logger as pinoLogger } from '@/lib/logger'
import { save } from './save'

const logger = pinoLogger.child({
  task: 'proofcheck',
})

const dictionaryUrl = process.env.DICTIONARY_URL
const dictionaryUsername = process.env.DICTIONARY_USERNAME
const dictionaryPassword = process.env.DICTIONARY_PASSWORD

if (!dictionaryUrl || !dictionaryUsername || !dictionaryPassword) {
  throw new Error('Missing dictionary credentials')
}

const dictionary = new Sanakirja(
  dictionaryUrl,
  dictionaryUsername,
  dictionaryPassword,
)

try {
  logger.debug('Starting proofcheck')

  const pageSize = 100

  let page = 1
  let words: WordsToProofcheck[]

  const categories = await fetchCategories()

  logger.debug(
    {
      categoriesCount: categories.length,
    },
    'Fetched categories',
  )

  do {
    logger.debug({ page }, 'Fetching words')

    words = await fetchWordsToProofcheck(page, pageSize)

    logger.debug(
      {
        wordsCount: words.length,
      },
      'Fetched words',
    )

    for (const word of words) {
      const startTime = performance.now()
      const definitions = await dictionary.getWordDefinitions(word.word)
      const proofcheckResults = await getProofcheckResults(
        definitions,
        categories,
      )

      await save(word, proofcheckResults)

      const endTime = performance.now()
      const time = `${(endTime - startTime) / 1000}s`

      logger.debug(
        { wordProofcheckTime: time, word: word.word },
        'Proofcheck time',
      )

      // to not get blocked. a strong no-no, but while I am waiting for my API key and to check the solution - this will work
      await sleep(10 * 1000)
    }

    page++
  } while (words.length > 0)
} catch (error) {
  console.error(error)
} finally {
  await dictionary.close()
}
