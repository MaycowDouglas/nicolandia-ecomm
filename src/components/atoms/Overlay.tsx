import { classNames } from '@/lib/classNames'
import { MouseEventHandler } from 'react'

type Props = {
  onClick?: MouseEventHandler<HTMLDivElement>
}

export default function Overlay({ onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={classNames('bg-black bg-opacity-50', 'fixed z-40 top-0 left-0 w-screen h-screen')}
    ></div>
  )
}
