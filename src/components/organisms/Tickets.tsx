import Combo360 from '@/public/images/tickets/combo-360.jpg'
import ComboLove from '@/public/images/tickets/combo-love.jpeg'
import ComboEncantado from '@/public/images/tickets/combo-encantado.jpg'
import ComboAntecipado from '@/public/images/tickets/combo-antecipado.jpg'
import SuperAntecipado from '@/public/images/tickets/super-antecipado.jpg'
import ComboEspetacular from '@/public/images/tickets/combo-espetacular.jpg'
import ComboSuperSegunda from '@/public/images/tickets/combo-super-segunda.jpeg'
import PassaporteAntecipado from '@/public/images/tickets/passaporte-antecipado.jpg'
import PassaporteIndividual from '@/public/images/tickets/passaporte-individual.jpg'
import PassaporteSuperSegunda from '@/public/images/tickets/passaporte-super-segunda.jpeg'
import SwiperCore, { Autoplay, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import Ticket from '../molecules/Ticket'
import QuartaQuintaMaluca from "@/public/images/tickets/quarta-quinta-maluca.jpg";

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
              reference={5997}
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
              quantity={1}
              price={5997}
              reference={5997}
              name="Passaporte Antecipado"
              banner={PassaporteAntecipado}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Ticket
              id={14}
              isPassport
              price={10197}
              quantity={2}
              reference={5997}
              name="Combo Antecipado"
              banner={ComboAntecipado}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Ticket
                id={17}
              isPassport
              quantity={3}
              price={14397}
              reference={5997}
              name="Super Antecipado"
              banner={SuperAntecipado}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Ticket
              id={20}
              price={4297}
              quantity={1}
              reference={4297}
              banner={QuartaQuintaMaluca}
              name="Quarta e Quinta Maluca"
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
              price={6957}
              reference={6957}
              name="Passaporte Individual"
              banner={PassaporteIndividual}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Ticket
              id={3}
              isPassport
              quantity={2}
              price={13397}
              reference={5997}
              name="Combo Encantado"
              banner={ComboEncantado}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Ticket
              id={4}
              isPassport
              quantity={3}
              price={18397}
              reference={6957}
              name="Combo Espetacular"
              banner={ComboEspetacular}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Ticket
              id={18}
              isPassport
              quantity={4}
              price={20397}
              reference={6957}
              name="Combo 360"
              banner={Combo360}
            />
          </SwiperSlide>
        </>
      )}
    </Swiper>
  )
}
