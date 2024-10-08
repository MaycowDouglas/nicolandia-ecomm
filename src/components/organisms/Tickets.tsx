import Combo360 from '@/public/images/tickets/combo-360.jpg'
import ComboAntecipado from '@/public/images/tickets/combo-antecipado.jpg'
import ComboEncantado from '@/public/images/tickets/combo-encantado.jpg'
import ComboEspetacular from '@/public/images/tickets/combo-espetacular.jpg'
import ComboLove from '@/public/images/tickets/combo-love.jpeg'
import ComboSuperSegunda from '@/public/images/tickets/combo-super-segunda.jpg'
import PassaporteAntecipado from '@/public/images/tickets/passaporte-antecipado.jpg'
import PassaporteIndividual from '@/public/images/tickets/passaporte-individual.jpg'
import PassaporteSuperSegunda from '@/public/images/tickets/passaporte-super-segunda.jpeg'
import QuartaQuintaMalucaCombo from '@/public/images/tickets/quarta-quinta-maluca-combo.jpg'
import QuartaQuintaMaluca from '@/public/images/tickets/quarta-quinta-maluca.jpg'
import SuperAntecipado from '@/public/images/tickets/super-antecipado.jpg'
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
              reference={5997}
              name="Passaporte Super Segunda"
              banner={PassaporteSuperSegunda}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Ticket
              id={19}
              isPassport
              price={5994}
              quantity={2}
              reference={5994}
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
              id={21}
              quantity={1}
              price={4297}
              reference={4297}
              banner={QuartaQuintaMaluca}
              name="Quarta e Quinta Maluca"
              description={
                <p className={'mt-2'}>
                  1 passaporte válido durante 30 dias, exclusivo para utilização nas quartas e
                  quintas-feiras, dentro do horário de funcionamento do parque.
                </p>
              }
            />
          </SwiperSlide>
          <SwiperSlide>
            <Ticket
              id={20}
              quantity={2}
              price={6997}
              reference={4297}
              banner={QuartaQuintaMalucaCombo}
              name="Combo Quarta e Quinta Maluca +"
              description={
                <p className={'mt-2'}>
                  2 passaportes válido durante 30 dias, exclusivo para utilização nas quartas e
                  quintas-feiras, dentro do horário de funcionamento do parque.
                </p>
              }
            />
          </SwiperSlide>
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
              price={11091}
              reference={11091}
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
              price={14788}
              reference={14788}
              name="Combo 360"
              banner={Combo360}
            />
          </SwiperSlide>
        </>
      )}
    </Swiper>
  )
}
