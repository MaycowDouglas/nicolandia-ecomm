import { classNames } from '@/lib/classNames'
import Adibra from '@/public/images/brands/adibra.png'
import Cadastur from '@/public/images/brands/cadastur.png'
import Iaapa from '@/public/images/brands/iaapa.webp'
import Logo from '@/public/images/brands/nicolandia-white.svg'
import TurismoResponsavel from '@/public/images/brands/turismo-responsavel.png'
import GooglePlay from '@/public/images/googleplay.png'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="pt-10 pb-5 bg-custom-600 text-white">
      <div className="container">
        <div
          className={classNames('flex flex-col gap-10', 'lg:flex-row lg:justify-between lg:gap-0')}
        >
          <Image src={Logo} className="w-auto h-24 mx-auto lg:mx-0" alt="Nicolândia" />

          <div
            className={classNames('flex flex-col gap-8 text-center', 'lg:flex-row lg:text-start')}
          >
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Parque associado:</h3>
              <div className={classNames('flex flex-col items-center gap-2', 'lg:flex-row')}>
                <Image
                  className="w-auto h-12 lg:h-14"
                  src={TurismoResponsavel}
                  alt="Turismo responsável, limpo e seguro"
                />
                <Image className="w-auto h-12 lg:h-14" src={Adibra} alt="Adibra" />
                <Image className="w-auto h-12 lg:h-14 grayscale" src={Iaapa} alt="IAAPA" />
                <Image className="w-auto h-10" src={Cadastur} alt="Cadastur" />
              </div>
            </div>

            {/* <div className="space-y-4">
              <h3 className="text-lg font-semibold">Baixe o APP:</h3>
              <ul className="flex flex-col gap-1">
                <li>
                  <Link
                    target="_blank"
                    className="inline-flex"
                    href="https://play.google.com/store/apps/details?id=com.nicolandia"
                    title="Disponível na Google Play"
                  >
                    <Image src={GooglePlay} className="w-auto h-12" alt="" />
                  </Link>
                </li>
              </ul>
            </div> */}
          </div>
        </div>

        <div role="separator" className="border-t-2 border-white my-3 lg:my-5"></div>

        <div
          className={classNames(
            'flex flex-col gap-2 items-center text-center text-sm',
            'lg:flex-row lg:justify-between'
          )}
        >
          <span>CNPJ: 04.021.270/0001-30</span>
          <address className="not-italic">
            Parque da Cidade Sarah Kubitschek Estacionamento 12 - Asa Sul, Brasília/DF
          </address>
          <span>Nicolândia © Copyright 2023</span>
        </div>
      </div>
    </footer>
  )
}
