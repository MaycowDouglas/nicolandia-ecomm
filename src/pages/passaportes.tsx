import 'swiper/css'
import 'swiper/css/navigation'

import Ticket from '@/components/molecules/Ticket'
import Assof from '@/public/images/brands/assof.png'
import Caadf from '@/public/images/brands/caadf.png'
import Oabdf from '@/public/images/brands/oabdf.png'
import ComboFamilia from '@/public/images/combos/combo-familia.png'
import ComboKabum from '@/public/images/combos/combo-kabum.jpeg'
import ComboPipoca from '@/public/images/combos/combo-pipoca.png'
import PassaporteAntecipado from '@/public/images/tickets/antecipado.png'
import ComboEncantado from '@/public/images/tickets/encantado.png'
import ComboEspetacular from '@/public/images/tickets/espetacular.png'
import PassaporteIndividual from '@/public/images/tickets/individual.png'
import Head from 'next/head'
import Image from 'next/image'
import { GoAlert } from 'react-icons/go'
import SwiperCore, { Autoplay, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {(nowSP.getDay() >= 1 && nowSP.getDay() <= 4) ||
              (nowSP.getDay() === 0 && nowSP.getHours() >= 20) ? (
              <Ticket
                id={7}
                name="Passaporte Antecipado"
                price={4997}
                banner={PassaporteAntecipado}
                quantity={1}
                reference={5997}
                isPassport
              />
            ) : (
              <Ticket
                id={2}
                name="Passaporte Individual"
                price={5997}
                banner={PassaporteIndividual}
                quantity={1}
                reference={5997}
                isPassport
              />
            )}
            {/* <Ticket
              id={3}
              name="Combo Encantado"
              price={14297}
              banner={ComboEncantado}
              quantity={2}
              reference={5997}
              isPassport
            />
            <Ticket
              id={4}
              name="Combo Espetacular"
              price={19797}
              banner={ComboEspetacular}
              quantity={3}
              reference={5997}
              isPassport
            /> */}
          </div>

          <h2 className="mt-10 lg:mt-16 mb-5 lg:mb-10 font-bold text-center md:text-start text-4xl md:text-4xl lg:text-5xl text-white">
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
          </Swiper>

          <div className="text-center md:w-1/2 mt-10 mx-auto" id="passaporte-vip">
            <h2 className="text-custom-600 font-black text-center text-3xl md:text-4xl xl:text-5xl leading-tight mb-5">
              VIP PASS
            </h2>

            <p className="text-white text-lg font-medium">
              Cansado de pegar filas? Comprando o seu passaporte você poderá adquirir sua pulseira
              VIP presencialmente na bilheteria do nosso parque por R$50,00. Consulte nossos
              atendentes e garanta já o seu!
            </p>
          </div>
        </div>
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
                <p>Inteira R$ 200,00</p>
                <p>Meia R$ 100,00</p>
              </div>

              <div>
                <h4 className="text-xl text-custom-600 font-bold mb-1">Combo Espetacular</h4>
                <p>3 pessoas R$ 210,00</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container my-10">
          <div className="border-t-2 border-slate-200"></div>
        </div>
        <div className="container pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3 gap-10 text-center xl:text-left xl:gap-0">
          <div>
            <h3 className="mb-5 text-3xl text-custom-600 font-black">Convênios</h3>

            <div className="xl:text-lg">
              <p>A compra deverá ser feita pelo titular.</p>
              <p>Passaporte por apenas R$ 50,00 cada.</p>
              <p>Permitido apenas 5 passaportes por carteirinha.</p>
              <p>Benefício válido dentro do calendário operacional do parque.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 xl:col-span-2 text-center">
            <div>
              <div className="flex justify-center items-end gap-3">
                <Image src={Oabdf} className="w-28 h-auto" alt="" />
                <Image src={Caadf} className="w-28 h-auto" alt="" />
              </div>
              <p className="p-3 leading-5">
                Compra disponível na bilheteria mediante apresentação da carteira da OAB-DF ou
                CAA-DF
              </p>
            </div>
            <div>
              <div className="flex justify-center items-end gap-3">
                <Image src={Assof} className="w-44 h-auto" alt="" />
              </div>
              <div className="p-3 leading-5 space-y-2">
                <p>
                  Compra disponível na bilheteria mediante apresentação da Declaração de Sócio,
                  emitido pela ASOF, com validade de 30 dias e Carteira Funcional.
                </p>
                <p className="font-bold">
                  É proibido o ingresso e a permanência com armas de fogo dentro das dependências do
                  parque.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section>
        <div className="my-10">
          <Image
            src={Convenios}
            className="w-full h-60 2xl:h-80 object-cover object-right"
            alt=""
          />
        </div>
        <div className="container">
          <h2 className="mt-10 mb-5 text-5xl text-custom-600 font-black">Convênios</h2>

          <div className="text-lg">
            <p>Passaporte por apenas R$ 50,00 cada.</p>
            <p>Permitido apenas 5 passaportes por carteirinha.</p>
            <p>Benefício válido dentro do calendário operacional do parque.</p>
          </div>
        </div>
      </section> */}
    </>
  )
}
