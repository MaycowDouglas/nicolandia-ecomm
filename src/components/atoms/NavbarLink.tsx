import Link from 'next/link'
import { ReactNode } from 'react'

type Props = {
  to: string
  external?: boolean
  children: ReactNode
}

export default function NavbarLink({ to, children, external = false }: Props) {
  return (
    <Link
      href={to}
      target={external ? '_blank' : '_self'}
      className="bg-custom-100 hover:saturate-[.75]"
    >
      <span className="flex justify-center items-end gap-2 py-2">{children}</span>
    </Link>
  )
}
