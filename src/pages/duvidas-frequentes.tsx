import FaqItem from '@/components/molecules/FaqItem'
import Head from 'next/head'
import { useState } from 'react'

export default function FaqPage() {
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0)

  type itemProps = {
    question: string
    awnser: string | string[]
  }

  const items: itemProps[] = [
    {
      question: 'Como funciona o Passaporte?',
      awnser:
        'Você pode desfrutar de todas as atrações quantas vezes desejar, do momento da abertura até o fechamento do parque, exceto nas seguintes atrações: tiro ao alvo, pescaria, trenzinho encantado, brinquedos operados por fichas, jogos eletrônicos e áreas de alimentação. Ao comprar dois ou mais passaportes com um único código, todos os visitantes devem estar presentes para receber as pulseiras de acesso. A entrega das pulseiras não será possível após a validação do código na bilheteria do parque. Além disso, não será permitido solicitar estornos parciais depois que alguns passaportes forem utilizados.',
    },
    /*{
      question: 'Como funciona a "Promoção Quarta e Quinta Maluca"?',
      awnser:
        'O Passaporte Promocional "Quarta e Quinta Maluca" é exclusivo para utilização ' +
        'nas quartas e quintas-feiras, dentro do horário de funcionamento do parque.\n' +
        'Este passaporte tem validade de 30 dias a partir da data da compra.\n' +
        'Porém, é importante ressaltar que não é permitido utilizar este passaporte em outros dias da semana, como sexta-feira, sábado ou domingo.',
    },*/
    {
      question: 'Como posso solicitar o estorno da minha compra?',
      awnser:
        'Você pode solicitar o estorno dentro de um prazo de até 7 dias após a confirmação do pagamento, enviando um e-mail para nosso suporte (suporte@novanicolandia.com.br). Se o pagamento tiver sido feito por boleto, será necessário fornecer os dados bancários do titular da compra. Lembre-se de que não aceitamos dados bancários de terceiros que não sejam o titular da compra. Estamos aqui para garantir uma experiência tranquila e segura para todos os nossos clientes.',
    },
    {
      question: 'Criança a partir de quantos anos pagam?',
      awnser:
        'Criança de até 04 (quatro) anos acompanhada de 01 (um) responsável adulto pagante, tem direito à entrada gratuita. Observando as restrições de cada atração infantil do nosso parque. OBS.: Obrigatório a apresentação de documento de identificação (RG ou certidão de nascimento) da criança na entrada do parque.',
    },
    {
      question: 'É necessário apresentar documento para retirar o passaporte?',
      awnser:
        'Para compras online: é necessário a apresentação do RG ou CNH do titular do cartão e do cadastro, voucher do pedido e o cartão de crédito físico utilizado.',
    },
    {
      question: 'Comprei meu passaporte pelo site, o que devo fazer?',
      awnser:
        'Anote ou imprima seu código, e valide o mesmo na portaria do parque para retirar seu passaporte. O sigilo de seu código é de sua responsabilidade, o parque não se responsabiliza caso você perca seu código e outra pessoa o utilize em seu lugar.',
    },
    {
      question: 'Aniversariante paga?',
      awnser:
        'O aniversariante do mês correspondente, terá gratuidade no seu passaporte, desde que acompanhado de mais um pagante. O benefício será exclusivo ao passaporte aniversariante, com o acompanhante no valor de R$ 50,00. Para adquirir, será necessário a compra presencial na bilheteria do parque, mediante a apresentação de documento com foto do aniversariante e seu acompanhante.',
    },
    {
      question: 'Posso realizar minha festa de aniversário no parque?',
      awnser:
        'Sim! Liberamos a entrada do bolo de aniversário, porém o parque não se responsabiliza por guardá-lo. Salgados, docinhos e bebidas não são permitidos. Temos também o pacote especial de aniversário com o buffet por nossa conta! Para mais informações, por favor, entrar em contato com a administração do parque.',
    },
    {
      question: 'Qual o tempo para utilização do passaporte comprado online?',
      awnser: 'Por 30 dias a partir da compra',
    },
    {
      question: 'Meu boleto não está sendo gerado, o que devo fazer?',
      awnser:
        'Geralmente isso ocorre quando o CEP está incorreto, verifique o CEP e tente novamente.',
    },
    {
      question: 'O que não é permitido no parque?',
      awnser: [
        'É proibida a entrada de animais.',
        'É proibido guardar lugar nas filas das atrações do parque.',
      ],
    },
    {
      question: 'Se começar a chover enquanto estou no parque, o que acontece?',
      awnser:
        'Entendemos que a chuva pode interferir na sua diversão no nosso parque. Por isso, se as atrações forem interrompidas devido ao mau tempo e você estiver no parque há menos de 2 horas, oferecemos o Seguro Chuva. Seu passaporte será revalidado gratuitamente para que possa usar em outro dia, permitindo que você retorne e aproveite as atrações. É importante que o visitante revalide o passaporte no mesmo dia para receber o Seguro Chuva. Este voucher permitirá que você retorne em outro momento e continue se divertindo conosco! Aproveite ao máximo sua experiência na Nova Nicolândia!',
    },
    {
      question: 'Posso entrar e sair do parque com o mesmo passaporte?',
      awnser:
        'O Visitante que adquiriu o passaporte do parque (pulseira) poderá fazer sua saída de no máximo 1 hora caso precise se ausentar do estabelecimento, ou ir até o estacionamento. Nestes casos, terá direito a uma tolerância máxima de 1 hora, passando desse tempo, deverá adquirir novamente o acesso as atrações.',
    },
    {
      question: 'Atenção com as crianças',
      awnser:
        'Queridos visitantes da Nova Nicolândia, informamos que, para que as crianças não se percam no nosso espaço, pedimos que coloquem o número de telefone do responsável na pulseira da mesma, pois caso ocorra, a assistência do parque ligará para o responsável. Pedimos aos pais e/ou responsáveis para que as crianças não fiquem descalças em nosso parque. Agradecemos a colaboração e desejamos muita diversão!',
    },
    {
      question: 'PcD / Autistas têm meia entrada?',
      awnser: [
        'Pessoas PcD e autistas têm passe livre e acesso a pulseira vip, e é necessário estar acompanhado(a) de um responsável. O responsável deverá adquirir a pulseira por R$50,00 na bilheteria presencial do parque.',
        'Para pessoas portadoras do espectro autista, é preciso apresentar o laudo ou RG com identificação na bilheteria presencial. Válido a partir de qualquer idade.',
      ],
    },
    {
      question: 'Alimentos e bebidas no parque',
      awnser: [
        'Levar o próprio lanche de casa é um direito seu. O parque permite a entrada de alimentos e bebidas por grupo de visitantes ou famílias. No entanto, a entrada com alimentos está condicionada ao primeiro acesso ao parque.',
        'É proibida a entrada de bebidas alcoólicas, garrafas de vidro e alimentos perecíveis, com exceção de lanches como sanduíches.',
        'Por questões de segurança e organização, não permitimos a entrada de bolsas e caixas térmicas de qualquer tipo, exceto para pessoas que possuem restrição alimentar. Nesses casos, é necessário apresentar um laudo médico na recepção, para que possamos fazer as devidas concessões.',
      ],
    },
    {
      question: 'Qual o horário da fila das atrações?',
      awnser: [
        'O parque encerra suas atividades às 20h. A partir das 19h, será iniciado o controle de filas das atrações. Desta forma, as filas podem ser fechadas a qualquer momento, a depender do fluxo.',
      ],
    },
    {
      question: 'Como funciona os NicoCards?',
      awnser: [
        'Objetivando sempre a melhor experiência de nossos visitantes e adequando nossas atrações continuamente as melhores práticas tecnológicas do mercado, você agora terá a sua visita ao parque, utilizando os cartões no lugar do passaporte tradicional, para o seu melhor aproveitamento das atrações, seguem algumas informações acerca dessa mudança:',
        '- O cartão irá substituir a tradicional pulseira nas compras on-line.',
        '- Para compras presenciais avulsas por categoria, o visitante precisa adquirir o cartão e recarregar de acordo com sua preferência, pela atração que deseja.',
        '- Em caso de chuva o crédito permanece no cartão, podendo ser utilizado em um outro momento.',
        '- Os clientes VIPS, além do cartão, continuarão acompanhados da pulseira.',
        '- A responsabilidade pela perda do cartão é do visitante, o uso é pessoal e intransferível.',
        '- Para seu maior conforto os operadores das atrações que validam seu cartão no passeio.',
      ],
    },
  ]
  return (
    <>
      <Head>
        <title>Nicolândia | Dúvidas frequentes</title>
      </Head>
      <section className="pb-10 pt-20">
        <div className="container">
          <h1 className="text-custom-600 font-black text-center text-3xl md:text-4xl xl:text-5xl leading-tight mb-10">
            Qual sua dúvida <br className="hidden md:block" />
            sobre nosso parque?
          </h1>

          {items.map((item, index) => (
            <FaqItem
              key={index}
              show={selectedQuestion === index}
              awnser={item.awnser}
              question={item.question}
              onClick={() => setSelectedQuestion(index)}
            />
          ))}
        </div>
      </section>
    </>
  )
}
