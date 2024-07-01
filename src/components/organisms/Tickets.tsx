import Combo360 from '@/public/images/tickets/combo-360.jpg'
import ComboLove from '@/public/images/tickets/combo-love.jpeg'
import ComboEncantado from '@/public/images/tickets/combo-encantado.jpg'
import ComboAntecipado from '@/public/images/combos/combo-antecipado.jpg'
import SuperAntecipado from '@/public/images/tickets/super-antecipado.jpg'
import ComboEspetacular from '@/public/images/tickets/combo-espetacular.jpg'
import ComboSuperSegunda from '@/public/images/tickets/combo-super-segunda.jpeg'
import PassaporteAntecipado from '@/public/images/tickets/passaporte-antecipado.jpg'
import PassaporteIndividual from '@/public/images/tickets/passaporte-individual.jpg'
import PassaporteSuperSegunda from '@/public/images/tickets/passaporte-super-segunda.jpeg'
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
      {((nowSP.getDay() === 0 && nowSP.getHours() >= 23) || nowSP.getDay() === 1) && (
        <>
          <SwiperSlide>
            <Ticket
              id={15}
              isPassport
              quantity={1}
              price={4797}
              isSuperSegunda
              reference={4797}
              name="Passaporte Super Segunda"
              banner={PassaporteSuperSegunda}
            />
          </SwiperSlide>

          <SwiperSlide>
            <Ticket
              id={19}
              isPassport
              price={8397}
              quantity={2}
              reference={4797}
              name="Combo Super Segunda"
              banner={ComboSuperSegunda}
            />
          </SwiperSlide>
        </>
      )}

      {nowSP.getDay() >= 2 && nowSP.getDay() <= 4 && (
        <>
          <SwiperSlide>
            <Ticket
              id={7}
              isPassport
              price={5747}
              quantity={1}
              reference={5747}
              name="Passaporte Antecipado"
              banner={PassaporteAntecipado}
            />
          </SwiperSlide>

          <SwiperSlide>
            <Ticket
              id={14}
              isPassport
              price={9772}
              quantity={2}
              reference={5747}
              name="Combo Antecipado"
              banner={ComboAntecipado}
            />
          </SwiperSlide>

          <SwiperSlide>
            <Ticket
              id={17}
              isPassport
              quantity={3}
              price={13790}
              reference={5747}
              name="Super Antecipado"
              banner={SuperAntecipado}
            />
          </SwiperSlide>
        </>
      )}

      {(nowSP.getDay() >= 5 || (nowSP.getDay() === 0 && nowSP.getHours() < 23)) && (
        <>
          <SwiperSlide>
            <Ticket
              id={2}
              isPassport
              quantity={1}
              price={6667}
              reference={6667}
              name="Passaporte Individual"
              banner={PassaporteIndividual}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Ticket
              id={3}
              isPassport
              quantity={2}
              price={12762}
              reference={5797}
              name="Combo Encantado"
              banner={ComboEncantado}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Ticket
              id={4}
              isPassport
              quantity={3}
              price={17592}
              reference={6667}
              name="Combo Espetacular"
              banner={ComboEspetacular}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Ticket
              id={18}
              isPassport
              quantity={4}
              price={19543}
              reference={6667}
              name="Combo 360"
              banner={Combo360}
            />
          </SwiperSlide>
        </>
      )}
    </Swiper>
  )
}
