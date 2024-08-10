export const userPrompt = (input: string, categories: string[]) => `
Analyze the following Finnish word or phrase: ${input}.

Be very strict about correct spelling, always correct incorrect spelling. Pay attention to single/double letters, accents, and special characters.
If there is a small typo or spelling mistake, use the corrected version and return a short description of the error.
Do not consider colloquial form an error and do not correct it, however, mention it in the description and provide a base form.

If it's a single word:

1. Convert and return the word to its most basic form (nominative singular for nouns, infinitive for verbs).
2. Translate the word in its most basic form (nominative singular for nouns, infinitive for verbs) to English.
3. Provide an English translation of the word as it is.
4. Provide the corrected original input word
5. Provide a short description of the word's meaning and usage in English, favoring colloquial language.
6. Provide 2-3 very simple example sentences in Finnish, each with an English translation.
7. Provide Part of speech (word class) of the word
8. Provide Difficulty category: Beginner, Intermediate, Advanced
9. Provide Register category: Formal, Informal, Slang, Technical
10. Provide Frequency category: Common, Uncommon, Rare
11. Provide 1-2 Thematic categories

If it's a short phrase:

1. Provide an English translation of the phrase as it is.
2. Provide the corrected original input phrase
3. Provide a short description of the phrase's meaning and usage in English, favoring colloquial language.
4. Provide 2-3 simple example sentences in Finnish using the phrase, each with an English translation.
5. Provide Difficulty category: Beginner, Intermediate, Advanced
6. Provide Register category: Formal, Informal, Slang, Technical
7. Provide Frequency category: Common, Uncommon, Rare
8. Provide 1-2 Thematic categories

For thematic category, you can choose from the following:

${categories.join('\n')}

However, if no category has a strong match - come up with your own thematic category.

When providing description provide a concise but informative description of the word's/phrase's meaning, usage, and cultural context in English. Include:
1. Its primary meaning and any significant secondary meanings
2. Any idiomatic uses or expressions it's part of
3. Cultural nuances or connotations, if applicable
4. Any interesting etymology or changes in usage over time, if relevant
`
