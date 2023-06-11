import { useCart } from '@/hooks/useCart'
import { CartItem as CartItemProps } from '@/types/cart'
import { MouseEventHandler } from 'react'
import { FiX } from 'react-icons/fi'

import Button from '../atoms/Button'
import Overlay from '../atoms/Overlay'
import CartItem from '../molecules/CartItem'

type Props = {
  onClick?: MouseEventHandler
}

export default function Cart({ onClick }: Props) {
  const { items, decrease, increase, destroy, cartTotal } = useCart()

  return (
    <>
      <Overlay onClick={onClick} />
      <aside className="fixed z-50 top-0 bottom-0 right-0 w-80 bg-white">
        <div className="px-5 py-2 flex justify-between items-center bg-primary text-light text-lg">
          <h2 className="text-custom-600 text-xl font-bold">Carrinho de Compras</h2>
          <button className="text-2xl" onClick={onClick}>
            <FiX />
          </button>
        </div>

        <div className="divide-y-2 divide-dark-30">
          {items.map((item: CartItemProps) => (
            <CartItem
              key={item.id}
              name={item.name}
              price={item.price * item.quantity}
              amount={item.quantity}
              remove={() => destroy(item.id)}
              increase={() => increase(item.id)}
              decrease={() => decrease(item.id)}
              priceFrom={item.reference}
              numOfTickets={item.numOfTickets}
            />
          ))}
        </div>

        <div className="absolute bottom-5 w-full px-5 py-2">
          <div className="border-t-2 border-dark-30 mb-5"></div>
          <p className="flex justify-between items-center text-xl font-bold">
            <span>Total:</span>
            <span>{cartTotal(true)}</span>
          </p>
          <Button theme="secondary" href="/checkout" onClick={onClick} isBlock className="mt-4">
            Iniciar compra
          </Button>
        </div>
      </aside>
    </>
  )
}
