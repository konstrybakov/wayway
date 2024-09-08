export const getDictCredentials = () => {
  const dictionaryUrl = process.env.DICTIONARY_URL
  const dictionaryUsername = process.env.DICTIONARY_USERNAME
  const dictionaryPassword = process.env.DICTIONARY_PASSWORD

  if (!dictionaryUrl || !dictionaryUsername || !dictionaryPassword) {
    throw new Error('Missing dictionary credentials')
  }

  return { dictionaryUrl, dictionaryUsername, dictionaryPassword }
}
