import { classNames } from '@/lib/classNames'
import BackgroundTicket from '@/public/images/tickets/ticket.png'
import Image, { StaticImageData } from 'next/image'
import { FaPlus } from 'react-icons/fa'

import Button from '../atoms/Button'

export type TicketProps = {
  name: string
  price: number
  banner: string | StaticImageData
  quantity: number
  reference: number
}

export default function Ticket({ banner, name, quantity, price, reference }: TicketProps) {
  return (
    <div className="relative p-5 pb-5 rounded-t-2xl overflow-hidden">
      <Image className="object-cover object-bottom" fill src={BackgroundTicket} alt="" />
      <div className="relative z-10">
        <Image
          priority
          className="rounded-lg"
          src={banner}
          alt={`${name} | ${quantity} passaporte por ${price}`}
        />

        <div className="text-center">
          <h3 className="pt-5 pb-2 text-2xl text-custom-100 font-bold">{name}</h3>

          <ul className="divide-y-2 text-sm">
            <li className="py-2">
              <ul className="space-y-2">
                <li className="font-bold">Válido somente para compra online</li>
                <li>Válido de sexta à domingo ou feriados</li>
                <li>
                  {`${quantity} ${
                    quantity > 1 ? 'passaportes válidos' : 'passaporte válido '
                  } durante 30 dias, dentro do calendário operacional do parque`}
                </li>
              </ul>
            </li>
            <li className="flex flex-col py-2">
              <span
                className={classNames(
                  price === reference ? 'invisible' : 'line-through text-custom-600'
                )}
              >
                De:{' '}
                {((reference * quantity) / 100).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
              <span className="font-bold text-xl">
                Por: {(price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </li>
            <li className="py-5">
              <Button type="react" isBlock>
                <FaPlus />
                <span>Adicionar ao carrinho</span>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
