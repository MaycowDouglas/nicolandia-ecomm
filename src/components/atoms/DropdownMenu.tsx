import { classNames } from '@/lib/classNames'
import { ReactNode } from 'react'

type Props = {
  show: boolean
  children: ReactNode
}

export default function DropdownMenu({ show, children }: Props) {
  return (
    <div
      className={classNames(
        !show ? 'hidden' : 'z-40 absolute top-5 right-0 px-5 py-1 bg-white shadow-xl'
      )}
    >
      {children}
    </div>
  )
}
