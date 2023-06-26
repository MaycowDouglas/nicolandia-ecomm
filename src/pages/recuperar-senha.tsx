import Button from '@/components/atoms/Button'
import { useFeedback } from '@/hooks/useFeedback'
import fetchJson from '@/lib/fetchJson'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useCallback, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

export default function RecoverPasswordPage() {
  const [email, setEmail] = useState('')
  const [recaptcha, setRecaptcha] = useState<string | null>(null)
  const { addFeedback } = useFeedback()

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()

      if (email === '') addFeedback({ type: 'error', message: 'Preencha o email!' })
      if (!recaptcha) addFeedback({ type: 'error', message: 'Marque o recaptcha!' })

      try {
        const response = await fetchJson('/api/retrieve', {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            recaptcha: recaptcha,
          }),
        })

        addFeedback({
          message: 'Enviamos um link de recuperação no seu Email!',
          duration: 10000,
        })
      } catch (error) {
        addFeedback({ type: 'error', message: 'Email não encontrado!' })
      }
    },
    [email, recaptcha, addFeedback]
  )

  return (
    <>
      <Head>
        <title>Nicolândia | Recuperação de senha</title>
      </Head>
      <div className="min-h-[581px] grid place-content-center py-10 bg-neutral-200">
        <form
          onSubmit={handleSubmit}
          className="p-10 flex flex-col gap-3 rounded-lg bg-white shadow-xl"
        >
          <h1 className="mb-5 text-center text-3xl font-bold">Recuperar senha</h1>
          <div className="">
            <label htmlFor="username">Email:</label>
            <input
              required
              id="username"
              type="email"
              name="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@exemplo.com"
              className="w-full mt-1 px-2 py-1 border-2 border-dark-10 rounded"
            />
          </div>

          <div className="flex justify-center my-5">
            <ReCAPTCHA
              sitekey="6LebOY8cAAAAAFdnKMqg-iWkvaSi2VXpTIKMGIWZ"
              onChange={(value) => setRecaptcha(value)}
            />
          </div>

          <Button>Recuperar</Button>
          <Button theme="secondary" href="/entrar">
            Voltar
          </Button>
        </form>
      </div>
    </>
  )
}
