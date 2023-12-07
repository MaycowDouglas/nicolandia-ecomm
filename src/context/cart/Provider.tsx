import { CartItem } from '@/types/cart'
import { ReactNode, useEffect, useState } from 'react'

import cartContext from '.'

export default function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem('Nicolandia@Cart122023')
    if (storedCart) {
      setItems(JSON.parse(storedCart))
    }
  }, [])

  function persist(items: CartItem[]) {
    setItems(items)
    localStorage.setItem('Nicolandia@Cart122023', JSON.stringify(items))
  }

  function add(item: CartItem) {
    const exists = items.find((old: CartItem) => old.id === item.id)

    if (exists) increase(item.id)
    else persist([...items, { ...item, quantity: 1 }])
  }

  function destroy(id: number) {
    const updatedCartItems = items.filter((old: CartItem) => old.id !== id)
    persist(updatedCartItems)
  }

  function increase(id: number) {
    const updated = items.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
    persist(updated)
  }

  function decrease(id: number) {
    const updated = items.map((item) => {
      if (item.id !== id) {
        return item
      }

      return item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    })

    persist(updated)
  }

  function cartTotal(formatted?: boolean) {
    const total = items.reduce(
      (total: number, item: CartItem) => total + item.price * item.quantity,
      0
    )

    const options = { style: 'currency', currency: 'BRL' }
    return !formatted || formatted === undefined
      ? total
      : (total / 100).toLocaleString('pt-br', options)
  }

  function clearCart() {
    setItems([])
    localStorage.clear()
  }

  const context = {
    items,
    add,
    destroy,
    increase,
    decrease,
    cartTotal,
    clearCart,
  }

  return <cartContext.Provider value={context}>{children}</cartContext.Provider>
}
