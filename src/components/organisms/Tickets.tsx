import PassaporteAntecipado from '@/public/images/tickets/antecipado.png'
import ComboEncantado from '@/public/images/tickets/encantado.png'
import ComboEspetacular from '@/public/images/tickets/espetacular.png'
import PassaporteIndividual from '@/public/images/tickets/individual.png'
import SwiperCore, { Autoplay, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import Ticket, { TicketProps } from '../molecules/Ticket'

SwiperCore.use([Autoplay, Navigation])

export default function Tickets() {
  const now = new Date()
  const nowSP = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }))
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
      <SwiperSlide>
        {(nowSP.getDay() >= 1 && nowSP.getDay() <= 4) ||
        (nowSP.getDay() === 0 && nowSP.getHours() >= 20) ? (
          <Ticket
            id={7}
            name="Passaporte Antecipado"
            price={5497}
            banner={PassaporteAntecipado}
            quantity={1}
            reference={7697}
          />
        ) : (
          <Ticket
            id={2}
            name="Passaporte Individual"
            price={7697}
            banner={PassaporteIndividual}
            quantity={1}
            reference={7697}
          />
        )}
      </SwiperSlide>
      <SwiperSlide>
        <Ticket
          id={3}
          name="Combo Encantado"
          price={14297}
          banner={ComboEncantado}
          quantity={2}
          reference={7697}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Ticket
          id={4}
          name="Combo Espetacular"
          price={19797}
          banner={ComboEspetacular}
          quantity={3}
          reference={7697}
        />
      </SwiperSlide>
    </Swiper>
  )
}
