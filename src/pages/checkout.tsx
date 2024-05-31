import Button from '@/components/atoms/Button'
import InputDate from '@/components/atoms/Input/InputDate'
import InputText, { masks } from '@/components/atoms/Input/InputText'
import { useCart } from '@/hooks/useCart'
import { useFeedback } from '@/hooks/useFeedback'
import useUser from '@/hooks/useUser'
import { classNames } from '@/lib/classNames'
import fetchJson from '@/lib/fetchJson'
import { ViaCepAddress } from '@/types/address'
import { Order, OrderResponse } from '@/types/order'
import fetch from 'isomorphic-unfetch'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { isIOS } from 'react-device-detect'
import ReCAPTCHA from 'react-google-recaptcha'
import { AiOutlineBarcode } from 'react-icons/ai'
import { BsQrCodeScan } from 'react-icons/bs'
import { FiChevronRight, FiEdit } from 'react-icons/fi'

type PersonalDataProps = {
  name: string
  email: string
  phone: string
  document: string
  birthday: string
  city: string
  state: string
  street: string
  number: string
  zipcode: string
  neighborhood: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { user } = useUser({ redirectTo: '/entrar?redir=/checkout' })
  const { addFeedback } = useFeedback()
  const { items, clearCart, cartTotal } = useCart()
  const loaded = useRef(false)

  const [isCepConfirmed, setCepConfirmation] = useState(false)
  const [recaptcha, setRecaptcha] = useState<string | null>(null)
  const [personalData, setPersonalData] = useState<PersonalDataProps>({
    name: '',
    email: '',
    phone: '',
    document: '',
    birthday: '',
    city: '',
    state: '',
    street: '',
    number: '',
    zipcode: '',
    neighborhood: '',
  })
  const [paymentMethod, setPaymentMethod] = useState<'PIX' | 'BOLETO' | undefined>(undefined)

  useEffect(() => {
    function convertDate(timestamps: number) {
      const date = new Date(timestamps * 1000)

      return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
        '0' + date.getDate()
      ).slice(-2)}`
    }

    let data = {
      name: '',
      email: '',
      phone: '',
      document: '',
      birthday: '',
      city: '',
      state: '',
      street: '',
      number: '',
      zipcode: '',
      neighborhood: '',
    }

    if (items.length === 0) {
      router.push('/passaportes')
      return
    }

    if (user && user.data && !loaded.current) {
      data = {
        ...data,
        name: user.data.name,
        email: user.data.email,
        document: user.data.document ? user.data.document : '',
        birthday: user.data.birthday ? convertDate(parseInt(user.data.birthday)) : '',
        phone:
          user.data.phones.length === 0
            ? ''
            : masks.phone(`${user.data.phones[0].ddd}${user.data.phones[0].number}`),
      }

      if (user.data.address && user.data.address.zipcode) {
        data = {
          ...data,
          city: String(user.data.address.city),
          state: String(user.data.address.state),
          street: String(user.data.address.street),
          zipcode: String(user.data.address.zipcode),
          neighborhood: String(user.data.address.neighborhood),
        }

        setCepConfirmation(true)
      }
      setPersonalData(data)
      loaded.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  function handleRecaptchaChange(token: string | null) {
    setRecaptcha(token)
  }

  const getAddressViaCep = useCallback(async (zipcode: number): Promise<ViaCepAddress> => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${zipcode}/json/`)
      const addressData: ViaCepAddress = await response.json()

      return addressData
    } catch (error) {
      return { erro: true }
    }
  }, [])

  const handlePersonalDataChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      let field = e.currentTarget.name,
        value = e.currentTarget.value

      setPersonalData((prevData) => ({ ...prevData, [field]: value }))
    },
    []
  )

  const handlePaymentMethodChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const method = e.currentTarget.value
    if (method === 'PIX' || method === 'BOLETO') {
      setPaymentMethod(method)
    }
  }, [])

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      try {
        e.preventDefault()

        if (!paymentMethod) {
          addFeedback({ type: 'error', message: 'Selecione um método de pagamento' })
          return
        }

        if (!recaptcha) {
          addFeedback({ type: 'error', message: 'Marque o recaptcha!' })
          return
        }

        if (personalData.birthday === '') {
          addFeedback({ type: 'error', message: 'Preencha a data de nascimento!' })
          return
        }

        if (personalData.number === '') {
          addFeedback({ type: 'error', message: 'Preencha o número do seu endereço!' })
          return
        }

        if (personalData.state.length > 2) {
          addFeedback({ type: 'error', message: 'Insira a sigla (2 letras) do seu estado!' })
          return
        }

        const order: Order = {
          company: 1,
          customer: {
            name: personalData.name,
            birthday: new Date(personalData.birthday).toLocaleDateString('pt-BR'),
            document: personalData.document.replace(/\D/g, ''),
            phones: [
              {
                ddd: personalData.phone.split(' ')[0].replace(/\D/g, ''),
                number: personalData.phone.split(' ')[1].replace(/\D/g, ''),
              },
            ],
            address: {
              city: personalData.city,
              state: personalData.state.toUpperCase(),
              number: personalData.number,
              street: personalData.street,
              zipcode: personalData.zipcode,
              neighborhood: personalData.neighborhood,
            },
          },
          recaptcha: recaptcha,
          invoice: {
            creditCard: '',
            installments: 1,
            paymentMethod: paymentMethod,
          },
          items: items.map((item) => {
            return { amount: item.quantity, product: item.id }
          }),
        }

        const response: OrderResponse = await fetchJson('/api/orders/create', {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(order),
        })

        if (response && response?.code) {
          clearCart()

          router.push({
            pathname: `/pagamento/${paymentMethod.toLowerCase()}/${response.id}`,
            query: { order: JSON.stringify(response) },
          })

          return
        }
        addFeedback({
          type: 'error',
          message: 'Erro de autenticação!',
        })
      } catch (error: any) {
        if (error?.data && error.data?.number) {
          addFeedback({
            type: 'error',
            message: 'Telefone Inválido!',
          })
        } else {
          console.log(error.data.data)
          addFeedback({
            type: 'error',
            message: Object.values(error?.data?.data).join('\n') || 'Falha ao finalizar compra.',
          })
        }
      }
    },
    [
      router,
      clearCart,
      paymentMethod,
      recaptcha,
      personalData.name,
      personalData.birthday,
      personalData.document,
      personalData.phone,
      personalData.city,
      personalData.state,
      personalData.number,
      personalData.street,
      personalData.zipcode,
      personalData.neighborhood,
      items,
      addFeedback,
    ]
  )

  return user && user.data ? (
    <>
      <Head>
        <title>Nicolândia | Checkout</title>
      </Head>
      <section className="pb-10 pt-20">
        <form className="container" onSubmit={handleSubmit}>
          <h1 className="text-5xl text-center lg:text-start text-gray-500 font-bold">Checkout</h1>

          <div className="mt-2 mb-10 border-2 border-neutral-100"></div>

          <div className="flex flex-wrap lg:flex-nowrap items-start gap-20">
            <div className="w-full lg:w-2/3">
              <h2 className="mb-3 text-2xl text-center lg:text-start font-bold">
                Dados do pessoais
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="name" className="inline-flex mb-1">
                    Nome
                  </label>
                  <InputText
                    id="name"
                    name="name"
                    value={personalData?.name}
                    onChange={handlePersonalDataChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="document" className="inline-flex mb-1">
                    CPF
                  </label>
                  <InputText
                    id="document"
                    name="document"
                    mask="cpf"
                    value={masks.cpf(personalData?.document)}
                    onChange={handlePersonalDataChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="" className="inline-flex mb-1">
                    Nascimento
                  </label>
                  <InputDate
                    id="birthday"
                    name="birthday"
                    value={personalData.birthday}
                    onChange={handlePersonalDataChange}
                    className={isIOS && personalData.birthday === '' ? 'py-5' : 'py-2'}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="inline-flex mb-1">
                    Telefone
                  </label>
                  <InputText
                    id="phone"
                    name="phone"
                    mask="phone"
                    value={masks.phone(String(personalData?.phone))}
                    onChange={handlePersonalDataChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="street" className="inline-flex mb-1">
                    Endereço
                  </label>
                  <InputText
                    id="street"
                    name="street"
                    value={personalData.street}
                    onChange={handlePersonalDataChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="number" className="inline-flex mb-1">
                    Número
                  </label>
                  <InputText
                    id="number"
                    name="number"
                    value={personalData.number}
                    onChange={handlePersonalDataChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="neighborhood" className="inline-flex mb-1">
                    Bairro
                  </label>
                  <InputText
                    id="neighborhood"
                    name="neighborhood"
                    value={personalData.neighborhood}
                    onChange={handlePersonalDataChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="city" className="inline-flex mb-1">
                    Cidade
                  </label>
                  <InputText
                    id="city"
                    name="city"
                    value={personalData.city}
                    onChange={handlePersonalDataChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="state" className="inline-flex mb-1">
                    Estado
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={personalData.state}
                    onChange={handlePersonalDataChange}
                    className="w-full px-4 py-2 border-2 border-neutral-200 rounded-xl outline-none"
                    required
                  >
                    <option value="AC">AC</option>
                    <option value="AL">AL</option>
                    <option value="AP">AP</option>
                    <option value="AM">AM</option>
                    <option value="BA">BA</option>
                    <option value="CE">CE</option>
                    <option value="DF">DF</option>
                    <option value="ES">ES</option>
                    <option value="GO">GO</option>
                    <option value="MA">MA</option>
                    <option value="MT">MT</option>
                    <option value="MS">MS</option>
                    <option value="MG">MG</option>
                    <option value="PA">PA</option>
                    <option value="PB">PB</option>
                    <option value="PR">PR</option>
                    <option value="PE">PE</option>
                    <option value="PI">PI</option>
                    <option value="RJ">RJ</option>
                    <option value="RN">RN</option>
                    <option value="RS">RS</option>
                    <option value="RO">RO</option>
                    <option value="RR">RR</option>
                    <option value="SC">SC</option>
                    <option value="SP">SP</option>
                    <option value="SE">SE</option>
                    <option value="TO">TO</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="zipcode" className="inline-flex mb-1">
                      Cep
                    </label>
                  </div>
                  <InputText
                    id="zipcode"
                    name="zipcode"
                    value={masks.cep(personalData.zipcode)}
                    onChange={handlePersonalDataChange}
                    required
                  />
                </div>
              </div>

              <h2 className="mt-10 mb-3 text-2xl text-center md:text-start font-bold">
                Forma de pagamento
              </h2>

              <div className="text-lg space-y-2">
                <div>
                  <input
                    type="radio"
                    id="method-pix"
                    name="payment-method"
                    className="peer hidden"
                    value="PIX"
                    checked={paymentMethod === 'PIX'}
                    onChange={handlePaymentMethodChange}
                  />
                  <label
                    htmlFor="method-pix"
                    className={classNames(
                      'peer-checked:bg-custom-200 peer-checked:text-white peer-checked:border-2',
                      'px-5 py-3 flex items-center justify-between border-[1px] border-neutral-200 shadow cursor-pointer'
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <BsQrCodeScan />
                      <span>Pix</span>
                    </span>
                    <FiChevronRight />
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="method-boleto"
                    name="payment-method"
                    className="peer hidden"
                    value="BOLETO"
                    checked={paymentMethod === 'BOLETO'}
                    onChange={handlePaymentMethodChange}
                  />
                  <label
                    htmlFor="method-boleto"
                    className={classNames(
                      'peer-checked:bg-custom-200 peer-checked:text-white peer-checked:border-2',
                      'px-5 py-3 flex items-center justify-between border-[1px] border-neutral-200 shadow cursor-pointer'
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <AiOutlineBarcode />
                      <span>Boleto</span>
                    </span>
                    <FiChevronRight />
                  </label>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/3">
              <h2 className="mb-3 text-2xl text-center md:text-start font-bold">Passaportes</h2>
              <div className="p-10 border-2 border-neutral-200">
                <ul className="space-y-2">
                  {items.map((item, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <span>
                        {item.quantity} x {item.name}
                      </span>
                      <span>
                        {((item.price * item.quantity) / 100).toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="border-t-2 border-neutral-200 my-5"></div>

                <p className="flex items-center justify-between">
                  <strong>Total:</strong>
                  <span>{cartTotal(true)}</span>
                </p>
              </div>

              <div className="flex justify-center my-5">
                <ReCAPTCHA
                  sitekey="6LebOY8cAAAAAFdnKMqg-iWkvaSi2VXpTIKMGIWZ"
                  onChange={handleRecaptchaChange}
                />
              </div>

              <div className="mb-5">
                {!paymentMethod === false && <Button isBlock>Finalizar Compra</Button>}
              </div>

              <ul className="space-y-3 text-xs">
                <li>
                  * É de total responsabilidade do visitante fazer uso de todos os passaportes. A
                  Nicolândia não entrega pulseiras avulsas no momento da troca, ou seja, se não
                  houver o número de pessoas correspondente ao combo, não haverá a opção de
                  substituição ou voucher.
                </li>
                <li>
                  *{' '}
                  {items.length > 1 || (items.length === 1 && items[0].quantity > 1)
                    ? 'Estes passaportes não são válidos'
                    : 'Este passaporte não é válido'}{' '}
                  para outras promoções do parque como: aniversariante da semana, eventos familiares
                  e pacotes escolares.
                </li>
                <li>
                  * É obrigatória a apresentação do documento de RG ou CNH do titular do cartão e
                  cartão de crédito.
                </li>
                <li>
                  * Entendemos que a chuva pode interferir na sua diversão no nosso parque. Por
                  isso, se as atrações forem interrompidas devido ao mau tempo e você estiver no
                  parque há menos de 2 horas, oferecemos o Seguro Chuva. Seu passaporte será
                  revalidado gratuitamente para que possa usar em outro dia, permitindo que você
                  retorne e aproveite as atrações. É importante que o visitante revalide o
                  passaporte no mesmo dia para receber o Seguro Chuva. Este voucher permitirá que
                  você retorne em outro momento e continue se divertindo conosco! Aproveite ao
                  máximo sua experiência na Nova Nicolândia!
                </li>
                <li className="font-bold">
                  NÃO SERÃO ACEITOS RECIBOS OU COMPROVANTES DE PAGAMENTOS PARA RETIRADA DO
                  PASSAPORTE, LIBERAÇÃO APENAS MEDIANTE APRESENTAÇÃO DO CÓDIGO ENVIADO POR E-MAIL
                  (YUUPE) OU ACESSANDO PELO SITE.
                </li>
              </ul>
            </div>
          </div>
        </form>
      </section>
    </>
  ) : (
    <></>
  )
}
