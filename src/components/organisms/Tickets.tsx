import ComboAntecipado from '@/public/images/combos/combo-antecipado.png'
import PassaporteAntecipado from '@/public/images/tickets/antecipado.png'
import ComboEncantado from '@/public/images/tickets/encantado.png'
import ComboEspetacular from '@/public/images/tickets/espetacular.png'
import PassaporteIndividual from '@/public/images/tickets/individual.png'
import PassaporteSuperSegunda from '@/public/images/tickets/super-segunda.png'
import SwiperCore, { Autoplay, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import Ticket from '../molecules/Ticket'

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
      {(nowSP.getDay() >= 1 && nowSP.getDay() <= 4) ||
      (nowSP.getDay() === 0 && nowSP.getHours() >= 20) ? (
        <>
          <SwiperSlide>
            <Ticket
              id={15}
              name="Passaporte Super Segunda"
              price={3997}
              banner={PassaporteSuperSegunda}
              quantity={1}
              reference={6997}
              isPassport
            />
          </SwiperSlide>
          {/* <SwiperSlide>
            <Ticket
              id={7}
              name="Passaporte Antecipado"
              price={4997}
              banner={PassaporteAntecipado}
              quantity={1}
              reference={6997}
              isPassport
            />
          </SwiperSlide>

          <SwiperSlide>
            <Ticket
              id={14}
              name="Combo Antecipado"
              price={8597}
              banner={ComboAntecipado}
              quantity={2}
              reference={6997}
              isPassport
            />
          </SwiperSlide> */}
        </>
      ) : (
        <>
          <SwiperSlide>
            <Ticket
              id={2}
              name="Passaporte Individual"
              price={5997}
              banner={PassaporteIndividual}
              quantity={1}
              reference={5997}
              isPassport
            />
          </SwiperSlide>
          <SwiperSlide>
            <Ticket
              id={3}
              name="Combo Encantado"
              price={10997}
              banner={ComboEncantado}
              quantity={2}
              reference={5997}
              isPassport
            />
          </SwiperSlide>
          <SwiperSlide>
            <Ticket
              id={4}
              name="Combo Espetacular"
              price={13997}
              banner={ComboEspetacular}
              quantity={3}
              reference={5997}
              isPassport
            />
          </SwiperSlide>
        </>
      )}
    </Swiper>
  )
}
