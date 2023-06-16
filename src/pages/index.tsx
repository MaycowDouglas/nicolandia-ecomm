import 'swiper/css'
import 'swiper/css/navigation'

import Button from '@/components/atoms/Button'
import SlideImage from '@/components/atoms/SlideImage'
import SlideVideo from '@/components/atoms/SlideVideo'
import Attractions from '@/components/organisms/Attractions'
import Tickets from '@/components/organisms/Tickets'
import BannerOneMobile from '@/public/images/banners/namorados-mobile.png'
import BannerOneWeb from '@/public/images/banners/namorados-web.png'
import NicoAppDark from '@/public/images/brands/nicoapp-dark.svg'
import Image from 'next/image'
import Link from 'next/link'
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
      <section>
        <Swiper
          ref={swiperRef}
          autoplay={{ delay: 4000 }}
          modules={[Navigation]}
          navigation={{
            prevEl: '.main-swiper-prev',
            nextEl: '.main-swiper-next',
          }}
        >
          {/* <SwiperSlide>
            <SlideImage
              alt="Diversão para toda a Família!"
              mobile={BannerOneMobile}
              desktop={BannerOneWeb}
              priority
            />
          </SwiperSlide> */}
          <SwiperSlide>
            <SlideVideo
              mobile="/videos/kabum-mobile.mp4"
              desktop="/videos/kabum-web.mp4"
              onPlay={stopSlideTransition}
              onPause={startSlideTransition}
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

          <Button
            target="_blank"
            title="Baixe o Nicoapp"
            href="https://play.google.com/store/apps/details?id=com.nicolandia"
          >
            Baixe o Nicoapp
          </Button>
        </div>
      </section>

      <section className="relative py-20 bg-custom-300">
        <div className="container relative z-20">
          <h2 className="mb-5 lg:mb-10 font-bold text-center md:text-start text-4xl md:text-4xl lg:text-5xl text-white">
            Passaportes
          </h2>
          <Tickets />
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
