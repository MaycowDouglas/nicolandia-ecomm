import PassaporteAntecipado from '@/public/images/tickets/antecipado.jpg'
import ComboEncantado from '@/public/images/tickets/encantado.jpg'
import ComboEspetacular from '@/public/images/tickets/espetacular.jpg'
import PassaporteIndividual from '@/public/images/tickets/individual.jpg'
import ComboNamorados from '@/public/images/tickets/namorados.png'
import { StaticImageData } from 'next/image'
import SwiperCore, { Autoplay, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import Ticket, { TicketProps } from '../molecules/Ticket'

SwiperCore.use([Autoplay, Navigation])

export default function Tickets() {
  const list: TicketProps[] = [
    {
      name: 'Passaporte Antecipado',
      price: 4990,
      banner: PassaporteAntecipado,
      quantity: 1,
      reference: 6490,
    },
    {
      name: 'Passaporte Individual',
      price: 6490,
      banner: PassaporteIndividual,
      quantity: 1,
      reference: 6490,
    },
    {
      name: 'Combo Love',
      price: 6990,
      banner: ComboNamorados,
      quantity: 2,
      reference: 6490,
    },
    {
      name: 'Combo Encantado',
      price: 11890,
      banner: ComboEncantado,
      quantity: 2,
      reference: 6490,
    },
    {
      name: 'Combo Espetacular',
      price: 16190,
      banner: ComboEspetacular,
      quantity: 3,
      reference: 6490,
    },
  ]

  return (
    <Swiper
      breakpoints={{
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },
      }}
      autoplay={{ delay: 4000 }}
      className="w-full"
      slidesPerView={1}
      spaceBetween={30}
    >
      {list.map((item, index) => (
        <SwiperSlide key={index}>
          <Ticket
            name={item.name}
            price={item.price}
            banner={item.banner}
            quantity={item.quantity}
            reference={item.reference}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
