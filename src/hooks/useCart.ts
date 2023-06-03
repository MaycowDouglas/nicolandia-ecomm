import cartContext from '@/context/cart'
import { useContext } from 'react'

export const useCart = () => useContext(cartContext)
