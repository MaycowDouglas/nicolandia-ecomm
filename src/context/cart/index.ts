import { CartProps } from '@/types/cart'
import { createContext } from 'react'

const cartContext = createContext<CartProps>({} as CartProps)

export default cartContext
