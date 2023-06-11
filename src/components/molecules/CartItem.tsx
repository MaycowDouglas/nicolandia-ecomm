import { MouseEventHandler, useEffect, useState } from 'react'
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'

type Props = {
  name: string
  amount: number
  price: number
  priceFrom?: number
  remove: MouseEventHandler
  increase: MouseEventHandler
  decrease: MouseEventHandler
  numOfTickets: number
}

export default function CartItem({
  name,
  price,
  amount,
  remove,
  increase,
  decrease,
  priceFrom,
  numOfTickets,
}: Props) {
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    setQuantity(amount)
  }, [amount])

  return (
    <div className="px-5 py-5">
      <div className="flex items-center justify-between mb-2">
        <span className="leading-5 font-bold ">{name}</span>
        <FiTrash2 className="text-custom-100 cursor-pointer" onClick={remove} />
      </div>
      <div className="flex items-end justify-between">
        <div className="w-28 p-2 flex gap-2 border-2 border-slate-300 rounded-lg text-center">
          <button className="text-custom-100 font-bold" onClick={decrease}>
            <FiMinus />
          </button>
          <input
            type="number"
            value={quantity}
            className="w-full bg-transparent text-center outline-none"
          />
          <button onClick={increase}>
            <FiPlus className="text-custom-100 font-bold" />
          </button>
        </div>
        <div className="">
          {priceFrom && price !== priceFrom ? (
            <small className="line-through">
              De{' '}
              {((priceFrom / 100) * numOfTickets * quantity).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </small>
          ) : (
            <></>
          )}
          <p className="font-bold">
            Por: {(price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>
      </div>
    </div>
  )
}
