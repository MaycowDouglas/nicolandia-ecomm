import { HTMLAttributeAnchorTarget, MouseEventHandler, ReactNode } from 'react'

import ButtonPill from './ButtonPill'
import ButtonReact from './ButtonRect'

export type ButtonProps = {
  href?: string
  title?: string
  theme?: 'primary' | 'secondary'
  target?: HTMLAttributeAnchorTarget
  isLink?: boolean
  isBlock?: boolean
  onClick?: MouseEventHandler
  children: ReactNode
  className?: string
}

type TypeOptions = {
  type?: 'pill' | 'react' | 'circle' | 'square'
}

export default function Button({
  href,
  type = 'react',
  theme = 'primary',
  title,
  target = '_self',
  isBlock = false,
  onClick,
  children,
  className = '',
}: ButtonProps & TypeOptions) {
  const typeButtons = {
    pill: (
      <ButtonPill
        href={href}
        theme={theme}
        title={title}
        target={target}
        isBlock={isBlock}
        onClick={onClick}
        className={className}
      >
        {children}
      </ButtonPill>
    ),
    react: (
      <ButtonReact
        href={href}
        title={title}
        theme={theme}
        target={target}
        isBlock={isBlock}
        onClick={onClick}
        className={className}
      >
        {children}
      </ButtonReact>
    ),
    circle: <button>{children}</button>,
    square: <button>{children}</button>,
  }

  return typeButtons[type]
}
