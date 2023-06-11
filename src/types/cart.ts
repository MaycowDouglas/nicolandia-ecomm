export type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  reference: number
  numOfTickets: number
}

export type CartProps = {
  items: CartItem[]
  add: (item: CartItem) => void
  destroy: (id: number) => void
  increase: (id: number) => void
  decrease: (id: number) => void
  cartTotal: (formatted?: boolean) => number | string
  clearCart: () => void
}
