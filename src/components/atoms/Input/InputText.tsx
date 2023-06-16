import { classNames } from '@/lib/classNames'
import { DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, useCallback } from 'react'

type AvailableMasks = 'email' | 'phone' | 'cpf' | 'cnpj' | 'cep'

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  mask?: AvailableMasks
}

export const masks = {
  cep: (value: string) => {
    // output => 99.999-999
    const digitsOnly = value.replace(/\D/g, '')
    return digitsOnly.replace(/^(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1-$2')
  },
  phone: (value: string) => {
    // output => (99) 99999-9999
    const digitsOnly = value.replace(/\D/g, '')
    return digitsOnly.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d)(\d{4})$/, '$1-$2')
  },
  cpf: (value: string) => {
    // output => 999.999.999-99
    const digitsOnly = value.replace(/\D/g, '')
    return digitsOnly
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1-$2')
  },
  cnpj: (value: string) => {
    // output => 99.999.999/0001-99
    const digitsOnly = value.replace(/\D/g, '')
    return digitsOnly
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
  },
}

export default function InputText({ mask, type, disabled, ...rest }: Props) {
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>, mask: AvailableMasks) => {
    switch (mask) {
      case 'cep':
        e.currentTarget.minLength = 10
        e.currentTarget.maxLength = 10
        e.currentTarget.value = masks.cep(e.currentTarget.value)
        break
      case 'cpf':
        e.currentTarget.minLength = 14
        e.currentTarget.maxLength = 14
        e.currentTarget.value = masks.cpf(e.currentTarget.value)
        break

      case 'cnpj':
        e.currentTarget.minLength = 18
        e.currentTarget.maxLength = 18
        e.currentTarget.value = masks.cnpj(e.currentTarget.value)
        break

      case 'phone':
        e.currentTarget.minLength = 15
        e.currentTarget.maxLength = 15
        e.currentTarget.value = masks.phone(e.currentTarget.value)
        break

      case 'email':
        e.currentTarget.value = e.currentTarget.value.toLowerCase()
        break

      default:
        break
    }
  }, [])

  return (
    <input
      type="text"
      className={classNames(
        disabled ? 'bg-neutral-200 text-dark text-opacity-50 cursor-not-allowed' : '',
        'w-full px-4 py-2 border-2 border-neutral-200 rounded-xl outline-none'
      )}
      onKeyDown={(e) => {
        if (type === 'email') handleKeyDown(e, 'email')
        else if (mask !== undefined) handleKeyDown(e, mask)
      }}
      disabled={disabled}
      {...rest}
    />
  )
}
