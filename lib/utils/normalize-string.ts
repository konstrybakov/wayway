import { collapseWhiteSpace } from 'collapse-white-space'

// TODO: consider advanced normalization: removing punctuation, etc.
export const normalizeString = (string: string) =>
  collapseWhiteSpace(string.toLocaleLowerCase(), {
    style: 'js',
    preserveLineEndings: false,
    trim: true,
  })
