import Image, { StaticImageData } from 'next/image'
import { useEffect, useState } from 'react'

type SlideImageProps = {
  alt?: string
  mobile: string | StaticImageData
  desktop: string | StaticImageData
  priority?: boolean
}

export default function SlideImage({
  desktop = '',
  mobile = '',
  alt = '',
  priority = false,
}: SlideImageProps) {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
  const [imageSource, setImageSource] = useState<string | StaticImageData>('')

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth
      setImageSize(screenWidth < 768 ? { width: 415, height: 900 } : { width: 1920, height: 950 })
      setImageSource(screenWidth < 768 ? mobile : desktop)
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [desktop, mobile])

  return (
    <div className="relative w-full bg-red">
      <Image
        alt={alt}
        src={imageSource}
        width={imageSize.width}
        height={imageSize.height}
        priority={priority}
        className="w-full object-cover object-center"
      />
    </div>
  )
}
