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
        'Você brinca quantas vezes quiser em todas as atrações, durante a abertura até o fechamento do parque, com exceção das seguintes atrações: tiro ao alvo, pescaria, trenzinho encantado, brinquedos de fichas, games e praça de alimentação. Na compra de dois ou mais passaportes em um único código, todos os visitantes devem estar presentes para a entrega das pulseiras. Não será permitida a entrega de pulseiras depois da validação do código na bilheteria do parque.',
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
        'Anote ou imprima seu código (Yuupe), e valide o mesmo na portaria do parque para retirar seu passaporte. O sigilo de seu código é de sua responsabilidade, o parque não se responsabiliza caso você perca seu código e outra pessoa o utilize em seu lugar.',
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
      awnser: 'É proibida a entrada de animais.',
    },
    {
      question: 'Se começar a chover enquanto estou no parque, o que acontece?',
      awnser:
        'Entendemos que é muito chato estar no nosso parque se divertindo e de repente começar a chover. Por isso, em caso de interrupção total das atrações devido à chuva, a Nova Nicolândia oferece uma cortesia aos visitantes que estão no parque há menos de 2 horas, terão seu passaporte revalidado gratuitamente pelo parque. Ou seja, você poderá voltar outro dia para se divertir aqui à vontade!',
    },
    {
      question: 'Posso entrar e sair do parque com o mesmo passaporte?',
      awnser:
        'O Visitante que adquiriu o passaporte do parque (pulseira) poderá fazer sua saída de no máximo 1 hora caso precise se ausentar do estabelecimento, ou ir até o estacionamento. Nestes casos, terá direito a uma tolerância máxima de 1 hora, passando desse tempo, deverá adquirir novamente o acesso as atrações.',
    },
    {
      question: 'Atenção com as crianças',
      awnser:
        'Queridos visitantes da Nova Nicolândia, informamos que, para que as crianças não se percam no nosso espaço, pedimos que coloquem o número de telefone do responsável na pulseira da mesma, pois caso ocorra, a assistência do parque ligará para o responsável. Agradecemos a colaboração e desejamos muita diversão!',
    },
    {
      question: 'Alimentos e bebidas no parque',
      awnser: [
        'Levar o próprio lanche de casa é um direito seu. O parque permite a entrada de alimentos e bebidas por grupo de visitantes ou famílias. Não sendo permitido a entrada de caixas de isopor, coolers ou mochilas, contendo os seguintes itens:',
        'Garrafas de vidro, bebidas alcoólicas, alimentos perecíveis tipo almoços, sendo permitido somente lanches como sanduíches de qualquer espécie, condicionando o acesso somente uma (1) única vez pelo responsável pelo grupo de passeio.',
        'Em casos de restrição alimentar, mediante apresentação de laudo médico, deve-se apresentar diretamente na portaria do parque.',
      ],
    },
    {
      question: 'Até que horas posso retirar um Combo Lanche?',
      awnser: ['Você pode retirar o seu pedido até as 19h.'],
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
