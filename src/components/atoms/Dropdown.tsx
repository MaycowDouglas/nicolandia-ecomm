import { ReactNode, useState } from 'react'

import DropdownMenu from './DropdownMenu'
import Overlay from './Overlay'

type Props = {
  label: ReactNode
  children: ReactNode
}

export default function Dropdown({ label, children }: Props) {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      {isOpen && <Overlay onClick={() => setOpen(false)} />}
      <div className="relative inline-flex items-center gap-3">
        <button onClick={() => setOpen(!isOpen)}>{label}</button>
        <DropdownMenu show={isOpen}>{children}</DropdownMenu>
      </div>
    </>
  )
}
