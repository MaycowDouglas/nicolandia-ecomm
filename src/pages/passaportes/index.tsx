import 'swiper/css'
import 'swiper/css/navigation'

import Ticket from '@/components/molecules/Ticket'
import NicoCardsWeb from '@/public/images/banners/nicocards-desktop.png'
import NicoCardsMobile from '@/public/images/banners/nicocards-mobile.png'
import Asmpf from '@/public/images/brands/asmpf.png'
import Assof from '@/public/images/brands/assof.png'
import Brb from '@/public/images/brands/brb.png'
import Caadf from '@/public/images/brands/caadf.png'
import Oabdf from '@/public/images/brands/oabdf.png'
import Sinprfdf from '@/public/images/brands/sinprfdf.png'
import ComboFamilia from '@/public/images/combos/combo-familia.png'
import ComboKabum from '@/public/images/combos/combo-kabum.jpeg'
import ComboPipoca from '@/public/images/combos/combo-pipoca.png'
import Combo360 from '@/public/images/tickets/combo-360.jpg'
import ComboAntecipado from '@/public/images/tickets/combo-antecipado.jpg'
import ComboEncantado from '@/public/images/tickets/combo-encantado.jpg'
import ComboEspetacular from '@/public/images/tickets/combo-espetacular.jpg'
import ComboLove from '@/public/images/tickets/combo-love.jpeg'
import ComboSuperSegunda from '@/public/images/tickets/combo-super-segunda.jpeg'
import PassaporteAntecipado from '@/public/images/tickets/passaporte-antecipado.jpg'
import PassaporteIndividual from '@/public/images/tickets/passaporte-individual.jpg'
import PassaporteSuperSegunda from '@/public/images/tickets/passaporte-super-segunda.jpeg'
import QuartaQuintaMaluca from '@/public/images/tickets/quarta-quinta-maluca.jpg'
import SuperAntecipado from '@/public/images/tickets/super-antecipado.jpg'
import Head from 'next/head'
import Image from 'next/image'
import { GoAlert } from 'react-icons/go'
import SwiperCore, { Autoplay, Navigation } from 'swiper'

SwiperCore.use([Autoplay, Navigation])

export default function PassaportsPage() {
  const now = new Date()
  const nowSP = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }))

  return (
    <>
      <Head>
        <title>Nicolândia | Passaportes</title>
        <meta
          name="description"
          content="Passaportes individuais, Combos, diversão e muito mais. A Nova Nicolândia é referência em levar alegria e diversão para todo o Distrito Federal e traz benefícios exclusivos para advogados e conveniados da OAB-DF e CAA-DF. Venha e apaixone-se!"
        />
      </Head>
      <section className="pt-20 pb-10 bg-custom-300">
        <div className="container">
          <h1 className="text-custom-600 font-black text-center text-3xl md:text-4xl xl:text-5xl leading-tight mb-12">
            Compre seus passaportes <br className="hidden md:block" /> com mais praticidade!
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {((nowSP.getDay() === 0 && nowSP.getHours() >= 23) || nowSP.getDay() === 1) && (
              <>
                <Ticket
                  id={15}
                  name="Passaporte Super Segunda"
                  price={4797}
                  banner={PassaporteSuperSegunda}
                  quantity={1}
                  reference={5997}
                  isPassport
                  isSuperSegunda
                />
                <Ticket
                  id={19}
                  isPassport
                  price={8397}
                  quantity={2}
                  reference={4797}
                  name="Combo Super Segunda"
                  banner={ComboSuperSegunda}
                />
              </>
            )}

            {nowSP.getDay() >= 2 && nowSP.getDay() <= 4 && (
              <>
                <Ticket
                  id={7}
                  isPassport
                  price={5997}
                  quantity={1}
                  reference={5997}
                  name="Passaporte Antecipado"
                  banner={PassaporteAntecipado}
                />

                <Ticket
                  id={14}
                  isPassport
                  price={10197}
                  quantity={2}
                  reference={5997}
                  name="Combo Antecipado"
                  banner={ComboAntecipado}
                />

                <Ticket
                  id={17}
                  isPassport
                  quantity={3}
                  price={14397}
                  reference={5997}
                  name="Super Antecipado"
                  banner={SuperAntecipado}
                />
                <Ticket
                  id={20}
                  price={4297}
                  quantity={1}
                  reference={4297}
                  banner={QuartaQuintaMaluca}
                  name="Quarta e Quinta Maluca"
                />
              </>
            )}

            {(nowSP.getDay() >= 5 || (nowSP.getDay() === 0 && nowSP.getHours() < 23)) && (
              <>
                <Ticket
                  id={2}
                  isPassport
                  quantity={1}
                  price={6957}
                  reference={6957}
                  name="Passaporte Individual"
                  banner={PassaporteIndividual}
                />
                <Ticket
                  id={3}
                  isPassport
                  quantity={2}
                  price={13397}
                  reference={6957}
                  name="Combo Encantado"
                  banner={ComboEncantado}
                />
                <Ticket
                  id={4}
                  isPassport
                  quantity={3}
                  price={18397}
                  reference={6667}
                  name="Combo Espetacular"
                  banner={ComboEspetacular}
                />
                <Ticket
                  id={18}
                  isPassport
                  quantity={4}
                  price={20397}
                  reference={6667}
                  name="Combo 360"
                  banner={Combo360}
                />
              </>
            )}
          </div>

          {/* <h2 className="mt-10 lg:mt-16 mb-5 lg:mb-10 font-bold text-center md:text-start text-4xl md:text-4xl lg:text-5xl text-white">
            Adicione mais sabor à sua diversão
          </h2>

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

          <div className="text-center md:w-1/2 mt-10 mx-auto" id="passaporte-vip">
            <h2 className="text-custom-600 font-black text-center text-3xl md:text-4xl xl:text-5xl leading-tight mb-5">
              VIP PASS
            </h2>

            <p className="text-white text-lg font-medium">
              Cansado de pegar filas? Comprando o seu passaporte você poderá adquirir sua pulseira
              VIP presencialmente na bilheteria do nosso parque por R$80,00. Consulte nossos
              atendentes e garanta já o seu!
            </p>
          </div>
        </div>
      </section>
      <section>
        <Image className="w-full h-auto hidden md:block" src={NicoCardsWeb} alt="" />
        <Image className="w-full h-auto md:hidden" src={NicoCardsMobile} alt="" />
      </section>
      <section>
        <h2 className="py-5 mb-10 flex items-center justify-center gap-4 bg-red-500 text-custom-300 text-4xl md:text-5xl font-black">
          <GoAlert className="mb-2" /> ATENÇÃO <GoAlert className="mb-2" />
        </h2>
        <div className="container grid grid-cols-1 md:grid-cols-2 text-center lg:text-left gap-10">
          <div>
            <h3 className="text-3xl text-custom-600 font-black mb-5" id="pagamento-com-boleto">
              Pagamento com boleto
            </h3>
            <div className="space-y-3">
              <p>
                NÃO ENVIAMOS BOLETOS POR E-MAIL. Caso seu boleto não apareça ao finalizar a compra,
                verifique seu CEP, e tente novamente, isso ocorre geralmente quando o CEP é
                inválido;
              </p>
              <p>
                Seu código só será liberado após o boleto ser compensado, o que pode levar até 72h.
                Você receberá seu código por e-mail, você também pode acompanhar suas compras no
                link abaixo:
              </p>
              <p className="font-bold">
                NÃO SERÃO ACEITOS RECIBOS OU COMPROVANTES DE PAGAMENTOS PARA RETIRADA DO PASSAPORTE,
                LIBERAÇÃO APENAS MEDIANTE APRESENTAÇÃO DO CÓDIGO ENVIADO POR E-MAIL OU ACESSANDO
                PELO SITE DA PAGUE.YUUPE.COM
              </p>
            </div>
          </div>
          <div>
            <h3
              className="text-3xl text-custom-600 font-black mb-5"
              id="como-utilizar-o-passaporte-online"
            >
              Como utilizar o passaporte online
            </h3>
            <div className="mb-8">
              <p>
                Anote ou imprima seu código (Yuupe), e valide o mesmo na bilheteria do parque para
                retirar seu passaporte. O sigilo de seu código é de sua responsabilidade, o parque
                não se responsabiliza caso você perca seu código e outra pessoa o utilize em seu
                lugar.
              </p>
            </div>

            <h3
              className="text-3xl text-custom-600 font-black mb-5"
              id="passaportes-bilheteria-do-parque"
            >
              Passaportes na bilheteria do parque
            </h3>

            <div className="grid grid-cols-2">
              <div>
                <h4 className="text-xl text-custom-600 font-bold mb-1">Passaporte Mágico</h4>
                <p>Inteira R$ 240,00</p>
                <p>Meia R$ 120,00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container my-10">
          <div className="border-t-2 border-slate-200"></div>
        </div>
        <div className="container flex flex-col justify-center items-center pb-10">
          <div className="mb-10 text-center">
            <h3 className="mb-5 text-3xl md:text-4xl xl:text-5xl text-custom-600 font-black">
              Convênios
            </h3>

            <div className="xl:text-lg">
              <p>A compra deverá ser feita pelo titular.</p>
              <p>Valores Passaporte:</p>
              <p>
                Terça a sexta: R$ 40,00 cada
                <br />
                Sábado e domingo R$ 60,00 cada
              </p>
              <p>Permitido apenas 5 passaportes por carteirinha.</p>
              <p>
                Compras válidas apenas na bilheteria presencial. Benefício válido dentro do
                calendário operacional do parque.
              </p>
              <p>
                <strong>
                  É proibido o ingresso e a permanência com armas de fogo dentro das dependências do
                  parque.
                </strong>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 items-center gap-5 sm:mt-10">
            <div className="flex flex-col items-center text-center">
              <div className="flex min-w-fit">
                <Image src={Oabdf} className="h-20 w-auto" alt="" />
                <Image src={Caadf} className="h-20 w-auto" alt="" />
              </div>
              <p className="p-3 text-lg">
                Compra disponível na bilheteria mediante apresentação da carteira da OAB-DF ou
                CAA-DF
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex min-w-fit">
                <Image src={Sinprfdf} className="h-20 w-auto" alt="" />
              </div>
              <p className="p-3 text-lg">
                Compra disponível na bilheteria mediante apresentação da carteira SINPRF-DF Válido
                para todos os associados de todos os estados.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex min-w-fit">
                <Image src={Assof} className="h-20 w-auto" alt="" />
              </div>
              <p className="p-3 text-lg">
                Compra disponível na bilheteria mediante apresentação da Declaração de Sócio,
                emitido pela ASOF, com validade de 30 dias e Carteira Funcional.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex min-w-fit">
                <Image src={Asmpf} className="h-20 w-auto" alt="" />
              </div>
              <p className="p-3 text-lg">
                Compra disponível na bilheteria mediante apresentação da carteira da ASMPF.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex min-w-fit">
                <Image src={Brb} className="h-20 w-auto" alt="" />
              </div>
              <p className="p-3 text-lg">
                Compra disponível na bilheteria mediante apresentação do cartão BRB no nome do
                titular com documento de identidade do mesmo.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
