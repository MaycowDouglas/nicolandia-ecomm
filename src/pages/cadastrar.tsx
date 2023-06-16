import Button from '@/components/atoms/Button'
import { useFeedback } from '@/hooks/useFeedback'
import useUser from '@/hooks/useUser'
import fetchJson from '@/lib/fetchJson'
import { SignUpProps } from '@/types/signup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

export default function RegisterPage() {
  const router = useRouter()
  const { addFeedback } = useFeedback()
  const { user } = useUser({
    redirectIfFound: true,
    redirectTo: '/minha-conta',
  })

  const [register, setRegister] = useState<SignUpProps>({
    name: '',
    email: '',
    password: '',
    recaptcha: '',
  })

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let field = e.currentTarget.name,
        value = e.currentTarget.value

      setRegister({ ...register, [field]: value })
    },
    [register]
  )

  const handleRecaptchaChange = useCallback(
    (token: string | null) => {
      setRegister({ ...register, recaptcha: token })
    },
    [register]
  )

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()

      if (
        register.name === '' ||
        register.email === '' ||
        register.password === '' ||
        register.recaptcha === ''
      ) {
        addFeedback({ type: 'error', message: 'Preencha todos os campos!' })
        return
      }

      if (register.password.length < 6) {
        addFeedback({ type: 'error', message: 'A senha deve possuir no minimo 6 caracteres.' })
        return
      }

      try {
        const response: object = await fetchJson('/api/register', {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: register.name,
            email: register.email,
            recaptcha: register.recaptcha,
            password: {
              first: register.password,
              second: register.password,
            },
          }),
        })

        if (Object.keys(response).includes('user')) {
          addFeedback({ message: 'Usuário criado com sucesso!' })

          setTimeout(() => {
            router.push('/entrar')
          }, 2000)
        }
      } catch (error) {
        addFeedback({ type: 'error', message: 'Já existe uma conta com esse email!' })
      }
    },
    [addFeedback, register, router]
  )

  return (
    <div className="min-h-[581px] grid place-content-center py-10 bg-neutral-200">
      <form
        onSubmit={handleSubmit}
        className="p-10 flex flex-col gap-3 rounded-lg bg-white shadow-xl"
      >
        <h1 className="mb-5 text-center text-3xl font-bold">Cadastrar</h1>
        <div className="">
          <label htmlFor="name">Nome completo:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={register.name}
            onChange={handleChange}
            placeholder="Pessoa Exemplo"
            className="w-full mt-1 px-2 py-1 border-2 border-dark-10 rounded"
            required
          />
        </div>

        <div className="">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={register.email}
            onChange={handleChange}
            placeholder="exemplo@exemplo.com"
            className="w-full mt-1 px-2 py-1 border-2 border-dark-10 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={register.password}
            onChange={handleChange}
            className="w-full mt-1 px-2 py-1 border-2 border-dark-10 rounded"
            required
          />
        </div>

        <div className="flex justify-center my-5">
          <ReCAPTCHA
            sitekey="6LebOY8cAAAAAFdnKMqg-iWkvaSi2VXpTIKMGIWZ"
            onChange={handleRecaptchaChange}
          />
        </div>

        <Button>Cadastrar</Button>

        <Link href="/entrar" className="text-center">
          Já possui uma conta? <span className="text-custom-200">Ir para Login.</span>
        </Link>
      </form>
    </div>
  )
}
