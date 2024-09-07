// TODO: consider advanced normalization: removing punctuation, etc.
// TODO: consider using localeLowerCase
export const normalize = (string: string) =>
  string.toLowerCase().trim().replace(/\s+/g, ' ')
