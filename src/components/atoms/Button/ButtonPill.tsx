import { classNames } from '@/lib/classNames'

import { ButtonProps } from '.'

export default function ButtonReact({ theme, children, isBlock }: ButtonProps) {
  return (
    <button
      className={classNames(
        isBlock ? 'w-full' : 'w-auto',
        theme === 'primary'
          ? 'bg-custom-100 text-white hover:saturate-150'
          : 'bg-custom-100 bg-opacity-0 text-custom-100 hover:bg-opacity-100 hover:text-white',
        'py-2 px-7 rounded-full border-2 border-custom-100 font-bold transition-all',
        'inline-flex items-center justify-center gap-2'
      )}
    >
      {children}
    </button>
  )
}
