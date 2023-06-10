import { classNames } from '@/lib/classNames'
import Link from 'next/link'

import { ButtonProps } from '.'

export default function ButtonReact({
  href,
  target,
  theme,
  title,
  children,
  isBlock,
}: ButtonProps) {
  const style = classNames(
    isBlock ? 'w-full' : 'w-auto',
    theme === 'primary'
      ? 'bg-custom-100 text-white hover:saturate-150'
      : 'bg-custom-100 bg-opacity-0 text-custom-100 hover:bg-opacity-100 hover:text-white',
    'py-2 px-7 rounded-lg border-2 border-custom-100 font-bold transition-all',
    'inline-flex items-center justify-center gap-2'
  )

  return href === undefined ? (
    <button title={title} className={style}>
      {children}
    </button>
  ) : (
    <Link href={href} target={target} title={title} className={style}>
      {children}
    </Link>
  )
}
