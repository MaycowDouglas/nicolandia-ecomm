import { HTMLAttributeAnchorTarget, ReactNode } from 'react'

import ButtonPill from './ButtonPill'
import ButtonReact from './ButtonRect'

export type ButtonProps = {
  href?: string
  title?: string
  theme?: 'primary' | 'secondary'
  target?: HTMLAttributeAnchorTarget
  isLink?: boolean
  isBlock?: boolean
  children: ReactNode
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
  children,
}: ButtonProps & TypeOptions) {
  const typeButtons = {
    pill: (
      <ButtonPill theme={theme} isBlock={isBlock} href={href} title={title} target={target}>
        {children}
      </ButtonPill>
    ),
    react: (
      <ButtonReact theme={theme} isBlock={isBlock} href={href} title={title} target={target}>
        {children}
      </ButtonReact>
    ),
    circle: <button>{children}</button>,
    square: <button>{children}</button>,
  }

  return typeButtons[type]
}
