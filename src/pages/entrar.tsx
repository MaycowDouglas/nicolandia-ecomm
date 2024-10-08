import Button from '@/components/atoms/Button'
import { useFeedback } from '@/hooks/useFeedback'
import useUser from '@/hooks/useUser'
import fetchJson, { FetchError } from '@/lib/fetchJson'
import { LoginProps } from '@/types/login'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { FiRepeat, FiUserPlus } from 'react-icons/fi'

export default function LoginPage() {
  const router = useRouter()
  const { addFeedback } = useFeedback()

  const redirectOptions = router.query.redir
    ? {
        redirectIfFound: true,
        redirectTo: router.query.redir as string,
      }
    : {
        redirectIfFound: true,
        redirectTo: '/painel',
      }

  const { mutateUser, user } = useUser(redirectOptions)

  const [login, setLogin] = useState<LoginProps>({
    username: '',
    password: '',
    recaptcha: '',
  })

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let field = e.currentTarget.name,
        value = e.currentTarget.value

      setLogin({ ...login, [field]: value })
    },
    [login]
  )

  const handleRecaptchaChange = useCallback(
    (token: string | null) => {
      setLogin({ ...login, recaptcha: token })
    },
    [login]
  )

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const response: any = await fetch('/api/login', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: login.username,
        password: login.password,
        recaptcha: login.recaptcha,
      }),
    })

    if (response.ok) {
      const data: any = await response.json()
      mutateUser(data)
    } else {
      addFeedback({ type: 'error', message: 'Usuário ou senha inválido!', duration: 4000 })
    }
  }

  return (
    <>
      <Head>
        <title>Nicolândia | Entrar</title>
      </Head>
      <div className="min-h-[581px] grid place-content-center pb-10 pt-20 bg-neutral-200">
        <form
          onSubmit={handleSubmit}
          className="p-10 flex flex-col gap-3 rounded-lg bg-white shadow-xl"
        >
          <h1 className="mb-5 text-center text-3xl font-bold">Entrar</h1>
          <div className="">
            <label htmlFor="username">Email:</label>
            <input
              type="email"
              id="username"
              name="username"
              value={login.username}
              onChange={handleChange}
              placeholder="exemplo@exemplo.com"
              className="w-full mt-1 px-2 py-1 border-2 border-dark-10 rounded"
            />
          </div>

          <div>
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={login.password}
              onChange={handleChange}
              className="w-full mt-1 px-2 py-1 border-2 border-dark-10 rounded"
            />
          </div>

          <div className="flex justify-center my-5">
            <ReCAPTCHA
              sitekey="6LebOY8cAAAAAFdnKMqg-iWkvaSi2VXpTIKMGIWZ"
              onChange={handleRecaptchaChange}
            />
          </div>

          <Button>Entrar</Button>

          <div className="flex items-center justify-between mt-3">
            <Link
              href={router.query.redir ? `/cadastrar?redir=${router.query.redir}` : '/cadastrar'}
              className="hover:text-custom-200"
            >
              Criar conta
            </Link>

            <Link
              href="/recuperar-senha"
              className="inline-flex items-center gap-2 hover:text-custom-200"
            >
              Recuperar Senha
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}
