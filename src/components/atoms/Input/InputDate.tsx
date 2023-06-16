import { classNames } from '@/lib/classNames'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {}

export default function InputDate({ className = '', disabled, ...rest }: Props) {
  return (
    <input
      type="date"
      className={classNames(
        className,
        disabled ? 'bg-neutral-200 text-dark text-opacity-50 cursor-not-allowed' : '',
        'w-full px-4 py-2 appearance-none bg-transparent border-2 border-neutral-200 rounded-xl leading-tight text-gray-700 focus:outline-none'
      )}
      {...rest}
    />
  )
}
