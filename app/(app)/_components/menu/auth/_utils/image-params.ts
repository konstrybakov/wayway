export const getImageParams = (): string => {
  const imageParams = new URLSearchParams()

  imageParams.set('height', '64')
  imageParams.set('width', '64')
  imageParams.set('fit', 'crop')
  imageParams.set('quality', '100')

  return imageParams.toString()
}
