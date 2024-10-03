export const getImageParams = (): string => {
  const imageParams = new URLSearchParams()

  // TODO: investigate if other image size is breaking
  // I've had some breaking on 64. seems like clerk image optimization isn't really working
  imageParams.set('height', '80')
  imageParams.set('width', '80')
  imageParams.set('fit', 'crop')
  imageParams.set('quality', '100')

  return imageParams.toString()
}
