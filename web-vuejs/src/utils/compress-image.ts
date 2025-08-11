interface CompressImageParams {
  file: File
  maxWidth?: number
  maxHeight?: number
  quality?: number
}

function convertToWebp(filename: string): string {
  const lastDotIndex = filename.lastIndexOf('.')

  if(lastDotIndex === -1) {
    return `${filename}.webp`
  }

  return `${filename.slice(0, lastDotIndex)}.webp`
}

export function compressImage({
  file,
  maxWidth = Number.POSITIVE_INFINITY,
  maxHeight = Number.POSITIVE_INFINITY,
  quality = 1
}: CompressImageParams) {
  const allowedFileTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/webp'
  ]

  if(!allowedFileTypes.includes(file.type)) {
    throw new Error(`Image format ${file.type} is not supported.`)
  }
  
  return new Promise<File>((resolve) => {
    const reader = new FileReader()

    reader.onload = event => {
      const compressed = new Image()

      compressed.onload = () => {
        const canvas = document.createElement('canvas')

        let width = compressed.width
        let height = compressed.height

        if(width > height) {
          if(width > maxWidth) {
            height *= maxWidth / width
            width = maxWidth
          }
        } else {
          if(height > maxHeight) {
            width *= maxHeight / height
            height = maxHeight
          }
        }

        canvas.width = width
        canvas.height = height

        const context = canvas.getContext('2d')

        if(!context) {
          throw new Error('Canvas context is not available.')
        }

        context.drawImage(compressed, 0, 0, width, height)

        canvas.toBlob(blob => {
            if(!blob) {
              throw new Error('Failed to compress image.')
            }

            const compressedFile = new File(
              [blob], 
              convertToWebp(file.name), 
              {
                type: 'image/webp',
                lastModified: Date.now()
              }
            )

            resolve(compressedFile)
          },
          'image/webp',
          quality
        )
      }

      compressed.src = event.target?.result as string
    }

    reader.readAsDataURL(file)
  })
}