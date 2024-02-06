import 'swiper/css'
import 'swiper/css/navigation'

import Button from '@/components/atoms/Button'
import SlideImage from '@/components/atoms/SlideImage'
import Attractions from '@/components/organisms/Attractions'
import Tickets from '@/components/organisms/Tickets'
import AppleStore from '@/public/images/applestore.png'
import Banner360Web from '@/public/images/banners/360-desktop.png'
import Banner360Mobile from '@/public/images/banners/360-mobile.png'
import BannerBrinquedosWeb from '@/public/images/banners/brinquedos-desktop.png'
import BannerBrinquedosMobile from '@/public/images/banners/brinquedos-mobile.png'
import CarnavalWeb from '@/public/images/banners/carnaval-desktop.png'
import CarnavalMobile from '@/public/images/banners/carnaval-mobile.png'
import BannerFeriasWeb from '@/public/images/banners/ferias-desktop.png'
import BannerFeriasMobile from '@/public/images/banners/ferias-mobile.png'
import NicoCardsWeb from '@/public/images/banners/nicocards-desktop.png'
import NicoCardsMobile from '@/public/images/banners/nicocards-mobile.png'
import NicoAppDark from '@/public/images/brands/nicoapp-dark.svg'
import GooglePlay from '@/public/images/googleplay.png'
import Head from 'next/head'
import Image from 'next/image'
import { useRef } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import SwiperCore, { Autoplay, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

SwiperCore.use([Autoplay, Navigation])

export default function HomePage() {
  const swiperRef = useRef<any>(null)

  const stopSlideTransition = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.stop()
    }
  }

  const startSlideTransition = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.start()
    }
  }
  return (
    <>
      <Head>
        <title>Seu lugar de diversão</title>
        <meta
          name="description"
          content="A Nova Nicolândia é um parque de diversões urbano e fechado, garantindo assim a segurança dos visitantes. O mundo da diversão não poderia estar em outro lugar, senão no coração de Brasília. Conheça o nosso parque e apaixone-se!"
        />
      </Head>
      <section className="mt-20 md:mt-8">
        <Swiper
          ref={swiperRef}
          autoplay={{ delay: 4000 }}
          modules={[Navigation]}
          navigation={{
            prevEl: '.main-swiper-prev',
            nextEl: '.main-swiper-next',
          }}
        >
          <SwiperSlide>
            <SlideImage
              alt="Diversão para toda a Família!"
              mobile={NicoCardsMobile}
              desktop={NicoCardsWeb}
            />
          </SwiperSlide>

          <SwiperSlide>
            <SlideImage
              alt="Diversão para toda a Família!"
              mobile={CarnavalMobile}
              desktop={CarnavalWeb}
            />
          </SwiperSlide>

          <SwiperSlide>
            <SlideImage
              alt="Diversão para toda a Família!"
              mobile={Banner360Mobile}
              desktop={Banner360Web}
            />
          </SwiperSlide>

          <SwiperSlide>
            <SlideImage
              alt="Diversão para toda a Família!"
              mobile={BannerBrinquedosMobile}
              desktop={BannerBrinquedosWeb}
            />
          </SwiperSlide>

          <div className="main-swiper-prev z-50 absolute top-0 bottom-0 left-0 px-2 flex items-center bg-black bg-opacity-30 text-white text-2xl md:text-5xl">
            <FaChevronLeft />
          </div>
          <div className="main-swiper-next z-50 absolute top-0 bottom-0 right-0 px-2 flex items-center bg-black bg-opacity-30 text-white text-2xl md:text-5xl">
            <FaChevronRight />
          </div>
        </Swiper>
      </section>

      <section className="relative flex bg-slate-100 py-8 text-center lg:text-left">
        <div id="app" className="absolute -top-44"></div>
        <div className="container flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-10 xl:gap-14">
          <Image src={NicoAppDark} alt="Nico App" />
          <div>
            <h2 className="mb-2 font-black text-custom-600 text-3xl xl:text-4xl">
              Confira ainda mais opções <br className="hidden lg:inline" /> no nosso app
            </h2>
            <p className="text-gray">Garanta descontos exclusivos no nosso app</p>
          </div>

          <div className="flex flex-col gap-2">
            <a
              className="inline-flex"
              href="https://play.google.com/store/apps/details?id=com.nicolandia"
              target="_blank"
            >
              <Image className="w-56 h-auto" src={GooglePlay} alt="Disponível no Google Play" />
            </a>
            <a
              className="inline-flex"
              href="https://apps.apple.com/br/app/nicolândia/id6450012072"
              target="_blank"
            >
              <Image className="w-56 h-auto" src={AppleStore} alt="Disponível na Apple Store" />
            </a>
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-custom-300">
        <div className="container relative z-20">
          <h2 className="mb-5 lg:mb-10 font-bold text-center md:text-start text-4xl md:text-4xl lg:text-5xl text-white">
            Passaportes
          </h2>

          <Tickets />

          {/* <h2 className="mt-10 lg:mt-16 mb-5 lg:mb-10 font-bold text-center md:text-start text-4xl md:text-4xl lg:text-5xl text-white">
            Adicione mais sabor à sua diversão
          </h2> */}

          {/* <Swiper
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
              <Ticket
                id={11}
                name="Combo Lanche Kabum"
                price={2997}
                banner={ComboKabum}
                quantity={1}
                reference={3800}
                description={
                  <>
                    <p className="mt-2 text-sm font-bold">Redirada do pedido até às 19h</p>
                    <p className="mt-2 text-sm">Não válido como passaporte</p>
                    <p className="mt-2 text-sm">
                      1 Hambúrguer, 1 Porção de batatas fritas pequena e 1 Fanta lata
                    </p>
                  </>
                }
              />
            </SwiperSlide>
            <SwiperSlide>
              <Ticket
                id={12}
                name="Combo Lanche Família"
                price={8997}
                banner={ComboFamilia}
                quantity={1}
                reference={10000}
                description={
                  <>
                    <p className="mt-2 text-sm font-bold">Redirada do pedido até às 19h</p>
                    <p className="mt-2 text-sm">Não válido como passaporte</p>
                    <p className="mt-2 text-sm">
                      3 Hambúrgueres Crazy Dance X-Salada, 1 Porção de batatas fritas grande e 1
                      Fanta 2 litros
                    </p>
                  </>
                }
              />
            </SwiperSlide>
            <SwiperSlide>
              <Ticket
                id={13}
                name="Combo Lanche Pipoca"
                price={2497}
                banner={ComboPipoca}
                quantity={1}
                reference={2800}
                description={
                  <>
                    <p className="mt-2 text-sm font-bold">Redirada do pedido até às 19h</p>
                    <p className="mt-2 text-sm">Não válido como passaporte</p>
                    <p className="mt-2 text-sm">1 Pipoca grande e 1 Fanta 600ml</p>
                  </>
                }
              />
            </SwiperSlide>
          </Swiper> */}
        </div>
        <svg
          className="absolute z-10 top-0 left-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#E79401"
            fillOpacity="1"
            d="M0,256L48,245.3C96,235,192,213,288,208C384,203,480,213,576,213.3C672,213,768,203,864,197.3C960,192,1056,192,1152,202.7C1248,213,1344,235,1392,245.3L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </section>

      <section className="relative py-20">
        <div className="relative container z-20">
          <h2 className="mb-5 lg:mb-10 font-bold text-center md:text-start text-4xl md:text-4xl lg:text-5xl text-custom-600">
            Atrações
          </h2>

          <Attractions />
        </div>
        <svg
          className="absolute z-10 bottom-0 left-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#E2E8F0"
            fillOpacity="1"
            d="M0,64L30,90.7C60,117,120,171,180,186.7C240,203,300,181,360,186.7C420,192,480,224,540,213.3C600,203,660,149,720,117.3C780,85,840,75,900,90.7C960,107,1020,149,1080,154.7C1140,160,1200,128,1260,112C1320,96,1380,96,1410,96L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          ></path>
        </svg>
      </section>
    </>
  )
}
