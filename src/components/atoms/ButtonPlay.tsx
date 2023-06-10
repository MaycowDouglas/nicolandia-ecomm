import { MouseEventHandler } from 'react'
import { FaPlay } from 'react-icons/fa'

type Props = {
  show: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}

export default function PlayButton({ show, onClick }: Props) {
  return (
    <button
      className={`z-50 w-32 h-32 inline-block ${
        show ? 'hidden' : 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
      }`}
      onClick={onClick}
    >
      <span className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex w-28 h-28 rounded-full bg-white bg-opacity-30 animate-pulse"></span>
      <span className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex w-20 h-20 rounded-full bg-white bg-opacity-50 animate-pulse"></span>
      <FaPlay className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex text-white text-2xl" />
    </button>
  )
}
