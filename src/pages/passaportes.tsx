import Ticket from '@/components/molecules/Ticket'
import PassaporteAntecipado from '@/public/images/tickets/antecipado.jpg'
import ComboEncantado from '@/public/images/tickets/encantado.jpg'
import ComboEspetacular from '@/public/images/tickets/espetacular.jpg'
import PassaporteIndividual from '@/public/images/tickets/individual.jpg'
import ComboNamorados from '@/public/images/tickets/namorados.png'
import Head from 'next/head'
import { GoAlert } from 'react-icons/go'

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
      <section className="py-10 bg-custom-300">
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
                price={4390}
                banner={PassaporteAntecipado}
                quantity={1}
                reference={6490}
              />
            ) : (
              <Ticket
                id={2}
                name="Passaporte Individual"
                price={6490}
                banner={PassaporteIndividual}
                quantity={1}
                reference={6490}
              />
            )}
            <Ticket
              id={10}
              name="Combo Love"
              price={6990}
              banner={ComboNamorados}
              quantity={2}
              reference={6490}
            />
            <Ticket
              id={4}
              name="Combo Espetacular"
              price={16190}
              banner={ComboEspetacular}
              quantity={3}
              reference={6490}
            />
          </div>

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
        <h2 className="py-5 flex items-center justify-center gap-4 bg-red-500 text-custom-300 text-4xl md:text-5xl font-black">
          <GoAlert className="mb-2" /> ATENÇÃO <GoAlert className="mb-2" />
        </h2>
        <div className="container grid grid-cols-1 md:grid-cols-2 text-center lg:text-left gap-10 py-8">
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
              Passaportes bilheteria do parque
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
      </section>
    </>
  )
}
