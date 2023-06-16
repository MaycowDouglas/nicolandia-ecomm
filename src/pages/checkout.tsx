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

  const [invoice, setInvoice] = useState(null)
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
      router.push('/')
    }

    if (!user) {
      router.push('/entrar?redir=/checkout')
    }

    if (user && user.data && !loaded.current) {
      console.log(user.data)
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

  const handlePersonalDataChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let field = e.currentTarget.name,
      value = e.currentTarget.value

    setPersonalData((prevData) => ({ ...prevData, [field]: value }))
  }, [])

  const handleZipcodeConfirmation = useCallback(
    async (e: FormEvent<HTMLInputElement>) => {
      const zipcode = e.currentTarget.value.replace(/\D/g, '')

      if (zipcode.length === 8) {
        const addressData: ViaCepAddress = await getAddressViaCep(parseInt(zipcode))

        if (addressData.erro) {
          addFeedback({ type: 'error', message: 'Cep inválido!' })
          setPersonalData((prevData) => ({ ...prevData, zipcode: '' }))
          setCepConfirmation(false)
          return
        }

        setPersonalData((prevData) => ({
          ...prevData,
          city: String(addressData.localidade),
          state: String(addressData.uf),
          street: String(addressData.logradouro),
          zipcode: String(addressData.cep),
          neighborhood: String(addressData.bairro),
        }))

        setCepConfirmation(true)
      }
    },
    [addFeedback, getAddressViaCep]
  )

  const handlePaymentMethodChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const method = e.currentTarget.value
    if (method === 'PIX' || method === 'BOLETO') {
      setPaymentMethod(method)
    }
  }, [])

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
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
            state: personalData.state,
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
    <section className="py-10">
      <form className="container" onSubmit={handleSubmit}>
        <h1 className="text-5xl text-center lg:text-start text-gray-500 font-bold">Checkout</h1>

        <div className="mt-2 mb-10 border-2 border-neutral-100"></div>

        <div className="flex flex-wrap lg:flex-nowrap items-start gap-20">
          <div className="w-full lg:w-2/3">
            <h2 className="mb-3 text-2xl text-center lg:text-start font-bold">Dados do pessoais</h2>
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
              {isCepConfirmed && (
                <>
                  <div>
                    <label htmlFor="street" className="inline-flex mb-1">
                      Endereço
                    </label>
                    <InputText
                      id="street"
                      name="street"
                      value={personalData.street}
                      onChange={handlePersonalDataChange}
                      disabled
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
                      disabled
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
                      disabled
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="inline-flex mb-1">
                      Estado
                    </label>
                    <InputText
                      id="state"
                      name="state"
                      value={personalData.state}
                      onChange={handlePersonalDataChange}
                      disabled
                      required
                    />
                  </div>
                </>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="zipcode" className="inline-flex mb-1">
                    Cep
                  </label>
                  {isCepConfirmed && (
                    <button
                      onClick={() => {
                        setCepConfirmation(false)
                        setPersonalData({ ...personalData, zipcode: '' })
                      }}
                      className="flex items-center gap-1 text-sm text-custom-200"
                    >
                      <FiEdit /> Alterar
                    </button>
                  )}
                </div>
                <InputText
                  id="zipcode"
                  name="zipcode"
                  value={masks.cep(personalData.zipcode)}
                  onChange={handlePersonalDataChange}
                  onInput={handleZipcodeConfirmation}
                  disabled={isCepConfirmed}
                  required
                />
              </div>
            </div>

            {isCepConfirmed && (
              <>
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
              </>
            )}
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

            {!paymentMethod === false && <Button isBlock>Finalizar Compra</Button>}
          </div>
        </div>
      </form>
    </section>
  ) : (
    <></>
  )
}
