import { data as attractions, AttractionProps } from '@/lib/attractions'
import SwiperCore, { Autoplay, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import Attraction from '../molecules/Attraction'

SwiperCore.use([Autoplay, Navigation])

export default function Attractions() {
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
      autoHeight={false}
    >
      {attractions.map((item: AttractionProps, index) => (
        <SwiperSlide key={index} className="py-10">
          <Attraction
            key={index}
            name={item.name}
            image={item.image}
            alert={item.alert}
            category={item.category}
            hideDetails
            observation={item.observation}
            restrictions={item.restrictions}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
