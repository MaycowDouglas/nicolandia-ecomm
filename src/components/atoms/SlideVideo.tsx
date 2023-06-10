import { useEffect, useRef, useState } from 'react'

import PlayButton from './ButtonPlay'

type SlideVideoProps = {
  mobile: string
  desktop: string
  onPlay: () => void
  onPause: () => void
}

export default function SlideVideo({ mobile, desktop, onPlay, onPause }: SlideVideoProps) {
  const videoRef = useRef<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoSource, setVideoSource] = useState<string>('')
  const [playbackTime, setPlaybackTime] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth
      setVideoSource(screenWidth < 768 ? mobile : desktop)
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [desktop, mobile])

  function handlePlayClick() {
    onPlay()
    setIsPlaying(true)
    videoRef.current.play()
  }

  function handlePause() {
    onPause()
    setIsPlaying(false)
    videoRef.current.currentTime = 0
  }

  return (
    <div className="relative">
      <div
        className={
          isPlaying ? 'hidden' : 'bg-dark bg-opacity-30 absolute top-0 left-0 right-0 bottom-0'
        }
      ></div>
      <PlayButton show={isPlaying} onClick={handlePlayClick} />

      <video
        ref={videoRef}
        src={videoSource}
        className="w-full h-screen object-cover object-center"
        onPause={handlePause}
        onTimeUpdate={() => setPlaybackTime(videoRef.current.currentTime)}
      />
    </div>
  )
}
