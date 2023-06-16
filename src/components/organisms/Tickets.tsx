import PassaporteAntecipado from '@/public/images/tickets/antecipado.jpg'
import ComboEncantado from '@/public/images/tickets/encantado.jpg'
import ComboEspetacular from '@/public/images/tickets/espetacular.jpg'
import PassaporteIndividual from '@/public/images/tickets/individual.jpg'
import ComboNamorados from '@/public/images/tickets/namorados.png'
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
            price={4990}
            banner={PassaporteAntecipado}
            quantity={1}
            reference={6490}
          />
        ) : (
          <Ticket
            id={2}
            name="Passaporte Individual"
            price={6490}
            banner={PassaporteIndividual}
            quantity={1}
            reference={6490}
          />
        )}
      </SwiperSlide>
      <SwiperSlide>
        <Ticket
          id={10}
          name="Combo Love"
          price={6990}
          banner={ComboNamorados}
          quantity={2}
          reference={6490}
        />
      </SwiperSlide>
      {/* <SwiperSlide>
        <Ticket
          id={3}
          name="Combo Encantado"
          price={11890}
          banner={ComboEncantado}
          quantity={2}
          reference={6490}
        />
      </SwiperSlide> */}
      <SwiperSlide>
        <Ticket
          id={4}
          name="Combo Espetacular"
          price={16190}
          banner={ComboEspetacular}
          quantity={3}
          reference={6490}
        />
      </SwiperSlide>
    </Swiper>
  )
}
