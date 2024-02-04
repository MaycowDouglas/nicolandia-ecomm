import ComboAntecipado from '@/public/images/combos/combo-antecipado.png'
import ComboEncantado from '@/public/images/tickets/combo-encantado.png'
import ComboEspetacular from '@/public/images/tickets/combo-espetacular.png'
import PassaporteAntecipado from '@/public/images/tickets/passaporte-antecipado.png'
import PassaporteIndividual from '@/public/images/tickets/passaporte-individual.png'
import PassaporteSuperSegunda from '@/public/images/tickets/passaporte-super-segunda.png'
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
      {((nowSP.getDay() === 0 && nowSP.getHours() >= 20) || nowSP.getDay() === 1) && (
        <SwiperSlide>
          <Ticket
            id={15}
            name="Passaporte Super Segunda"
            price={4297}
            banner={PassaporteSuperSegunda}
            quantity={1}
            reference={4297}
            isPassport
            isSuperSegunda
          />
        </SwiperSlide>
      )}

      {nowSP.getDay() >= 2 && nowSP.getDay() <= 4 && (
        <>
          <SwiperSlide>
            {/* <Ticket
              id={7}
              name="Passaporte Antecipado"
              price={4997}
              banner={PassaporteAntecipado}
              quantity={1}
              reference={7697}
              isPassport
            /> */}
            <Ticket
              id={2}
              name="Passaporte Individual"
              price={4997}
              banner={PassaporteIndividual}
              quantity={1}
              reference={4997}
              isPassport
            />
          </SwiperSlide>

          <SwiperSlide>
            <Ticket
              id={14}
              name="Combo Antecipado"
              price={9597}
              banner={ComboAntecipado}
              quantity={2}
              reference={7697}
              isPassport
            />
          </SwiperSlide>
        </>
      )}

      {(nowSP.getDay() >= 5 || (nowSP.getDay() === 0 && nowSP.getHours() < 20)) && (
        <>
          <SwiperSlide>
            <Ticket
              id={2}
              name="Passaporte Individual"
              price={4997}
              banner={PassaporteIndividual}
              quantity={1}
              reference={4997}
              isPassport
            />
          </SwiperSlide>
          {/* <SwiperSlide>
            <Ticket
              id={3}
              name="Combo Encantado"
              price={14297}
              banner={ComboEncantado}
              quantity={2}
              reference={7697}
              isPassport
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
              isPassport
            />
          </SwiperSlide> */}
        </>
      )}
    </Swiper>
  )
}
