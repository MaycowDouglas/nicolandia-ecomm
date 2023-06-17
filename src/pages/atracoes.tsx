import Attraction from '@/components/molecules/Attraction'
import { data as attractions } from '@/lib/attractions'
import Head from 'next/head'

export default function AttractionPage() {
  return (
    <>
      <Head>
        <title>Nicolândia | Atrações</title>
        <meta
          name="description"
          content="Conheça nossas atrações! São diversos brinquedos para todas as idades, com muita diversão e segurança para você e sua família!"
        />
      </Head>
      <section className="relative py-10">
        <div className="relative container z-20">
          <h1 className="text-custom-600 font-black text-center text-3xl md:text-4xl xl:text-5xl leading-tight mb-10">
            Na <span className="text-red-500">Nicolândia</span>, você{' '}
            <br className="hidden md:block" />
            se diverte de verdade!
          </h1>

          <div className="mt-2 mb-20 border-2 border-neutral-100"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {attractions.map((attraction, index) => (
              <Attraction
                key={index}
                name={attraction.name}
                image={attraction.image}
                category={attraction.category}
                alert={attraction.alert}
                observation={attraction.observation}
                restrictions={attraction.restrictions}
              />
            ))}
          </div>
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
