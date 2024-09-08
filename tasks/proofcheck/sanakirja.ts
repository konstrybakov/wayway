import { collapseWhiteSpace } from 'collapse-white-space'
import { convert } from 'html-to-text'
import { logger as pinoLogger } from '@/lib/logger'
import {
  chromium,
  type Browser,
  type BrowserContext,
  type Page,
} from 'playwright'
import path from 'node:path'

const authFile = path.join(__dirname, '.auth/user.json')
const authExists = await Bun.file(authFile).exists()

if (!authExists) {
  await Bun.write(authFile, JSON.stringify({}))
}

export class Sanakirja {
  private loggedIn = false

  private browser: Browser | null = null
  private browserContext: BrowserContext | null = null

  constructor(
    private readonly url: string,
    private readonly username: string,
    private readonly password: string,
    private readonly logger = pinoLogger,
  ) {}

  async getBrowser() {
    if (!this.browser) {
      this.logger.debug('Launching browser')

      this.browser = await chromium.launch({
        headless: true,
      })
    }

    return this.browser
  }

  async getBrowserContext() {
    if (!this.browserContext) {
      const browser = await this.getBrowser()

      this.logger.debug('Creating browser context')

      this.browserContext = await browser.newContext({
        storageState: authFile,
        baseURL: this.url,
      })
    }

    return this.browserContext
  }

  async getPage() {
    const browserContext = await this.getBrowserContext()
    const page = await browserContext.newPage()

    page.setDefaultTimeout(10000)

    return page
  }

  async close() {
    if (this.browserContext) {
      await this.browserContext.close()
    }

    if (this.browser) {
      await this.browser.close()
    }
  }

  async login() {
    const logger = this.logger.child({
      method: 'login',
    })

    logger.debug('Logging in')

    const page = await this.getPage()

    await page.goto('/')

    const loggedIn =
      this.loggedIn || (await this.locators(page).profileButton.isVisible())

    if (loggedIn) {
      logger.debug('Already logged in')

      this.loggedIn = true

      return
    }

    await this.locators(page).loginButton.click()
    await this.locators(page).signInFormEmailInput.fill(this.username)
    await this.locators(page).signInFormPasswordInput.fill(this.password)
    await this.locators(page).signInFormSubmitButton.click()
    await this.locators(page).profileButton.waitFor({ state: 'visible' })

    await page.context().storageState({ path: authFile })

    logger.debug('Logged in')

    this.loggedIn = true
  }

  async getWordDefinitions(word: string) {
    if (!this.loggedIn) {
      await this.login()
    }

    const logger = this.logger.child({
      method: 'getWordDefinitions',
      word,
    })

    logger.debug('Getting word definitions')

    const page = await this.getPage()

    await page.goto(this.getWordPath(word))

    await this.locators(page).dictionaryResults.waitFor({ state: 'visible' })

    const definitionsHTML = await this.locators(
      page,
    ).dictionaryResultsEntry.evaluateAll(elements =>
      elements.map(element => element.innerHTML),
    )

    logger.debug(
      { definitionsCount: definitionsHTML.length },
      'Got word definitions',
    )

    return definitionsHTML.map(this.parseDefinition)
  }

  getWordPath(word: string) {
    const url = `/finnish-english/${encodeURIComponent(word)}`

    return url
  }

  parseDefinition(definition: string) {
    return collapseWhiteSpace(
      convert(definition, {
        selectors: [
          { selector: 'entry-lock-and-popup', format: 'skip' },
          { selector: 'a', options: { ignoreHref: true } },
          { selector: '.entry-info-area', format: 'skip' },
          {
            selector: '.dict-example-group',
            format: 'dictExampleGroup',
          },
          {
            selector: 'em.label',
            format: 'emLabel',
          },
        ],
        formatters: {
          dictExampleGroup: (elem, walk, builder) => {
            walk(elem.children, builder)
            builder.addInline('---')
            builder.addLineBreak()
          },
          emLabel: (elem, walk, builder) => {
            builder.addInline('(')
            walk(elem.children, builder)
            builder.addInline(')')
            builder.addInline(' ')
          },
        },
      }),
      {
        preserveLineEndings: true,
      },
    )
  }

  private locators(page: Page) {
    const locators = {
      profileButton: page
        .getByRole('navigation')
        .getByRole('button', { name: 'My profile' }),
      loginButton: page
        .getByRole('navigation')
        .getByRole('button', { name: 'Log in' }),
      signInFormEmailInput: page
        .locator('form[name="loginform"]')
        .getByRole('textbox', { name: 'email' }),
      signInFormPasswordInput: page
        .locator('form[name="loginform"]')
        .getByRole('textbox', { name: 'password' }),
      signInFormSubmitButton: page
        .locator('form[name="loginform"]')
        .getByRole('button', { name: 'Log in' }),
      dictionaryResults: page.locator('[aria-label="Dictionary results"]'),
      dictionaryResultsEntry: page.locator(
        '[aria-label="Dictionary results"] article',
      ),
    } as const

    return locators
  }
}
