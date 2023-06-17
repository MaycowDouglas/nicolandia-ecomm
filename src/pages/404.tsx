import Button from '@/components/atoms/Button'
import Head from 'next/head'

export default function PageNotFound() {
  return (
    <>
      <Head>
        <title>Nicolândia | Página não encontrada</title>
      </Head>
      <div className="py-32 grid place-content-center text-center">
        <h1 className="text-5xl font-bold">Página não encontrada!</h1>
        <div className="w-96 mx-auto my-5">
          <p>
            Verifique se o endereço para o site foi digitado corretamente. Caso você tenha vindo de
            um link do próprio site ou de anúncios, nos avise.
          </p>
        </div>
        <div className="max-w-xs md:max-w-none mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
          <Button isBlock theme="secondary" href="/">
            Contate-nos por whatsapp
          </Button>
          <Button isBlock href="/">
            Ir para a página inicial
          </Button>
        </div>
      </div>
    </>
  )
}
