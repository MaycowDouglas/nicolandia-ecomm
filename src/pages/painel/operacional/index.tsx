import 'react-loading-skeleton/dist/skeleton.css'

import { masks } from '@/components/atoms/Input/InputText'
import Spin from '@/components/atoms/Spin'
import useUser from '@/hooks/useUser'
import { classNames } from '@/lib/classNames'
import fetchJson from '@/lib/fetchJson'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import Skeleton from 'react-loading-skeleton'

type PaymentStatus =
  | 'paid'
  | 'failed'
  | 'refused'
  | 'pending'
  | 'expired'
  | 'canceled'
  | 'refunded'
  | 'refunding'
  | 'authorized'
  | 'chargeback'
  | 'in_protest'
  | 'in_analysis'
  | 'partially_paid'
  | 'waiting_payment'

type ClientProps = {
  name: string
  document: string | null
  email: string
  ordered: [
    {
      id: string
      code: string
      used_on: string | null
      created_at: string
      gateway_id: string
      invoice: {
        payment_method: string
        status: PaymentStatus
      }
      item: [
        {
          amount: number
          product: {
            name: string
          }
        }
      ]
    }
  ]
} | null

export default function DashboardOperational() {
  const router = useRouter()
  const [isLoading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState('')
  const [client, setClient] = useState<ClientProps>(null)
  const { user } = useUser({ redirectTo: '/entrar?redir=/painel' })

  const paymentStatus = {
    paid: { label: 'pago', style: 'bg-green-400' },
    failed: { label: 'falhou', style: 'bg-red-400' },
    refused: { label: 'recusado', style: 'bg-red-400' },
    pending: { label: 'pendente', style: 'bg-yellow-400' },
    expired: { label: 'expirou', style: 'bg-red-400' },
    canceled: { label: 'cancelado', style: 'bg-red-400' },
    refunded: { label: 'estornado', style: 'bg-red-400' },
    refunding: { label: 'estornado', style: 'bg-red-400' },
    authorized: { label: 'autorizado', style: 'bg-green-400' },
    chargeback: { label: 'chargeback', style: 'bg-yellow-400' },
    in_protest: { label: 'protesto', style: 'bg-yellow-400' },
    in_analysis: { label: 'analise', style: 'bg-yellow-400' },
    partially_paid: { label: 'parcial', style: 'bg-yellow-400' },
    waiting_payment: { label: 'aguardando', style: 'bg-yellow-400' },
  }

  useEffect(() => {
    if (user && user.data?.email !== String(process.env.NEXT_PUBLIC_OPERATIONAL_MANAGER)) {
      router.push('/painel')
    }
  }, [user, router])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const searchParam = e.currentTarget.search.value

    const result: ClientProps = await fetchJson('/api/clients', {
      method: 'POST',
      body: JSON.stringify({
        searchParam,
      }),
    })

    setClient(result)
    setLoading(false)
  }, [])

  const reversePurchase = async (id: string) => {
    setActionLoading(`reverse_${id}`)

    const result = await fetchJson(`/api/orders/${id}/reverse`, { method: 'POST' })

    setActionLoading('')
  }

  const tickerUse = async (id: string) => {
    setActionLoading(`use_${id}`)

    try {
      const result = await fetchJson(`/api/orders/${id}/use`, { method: 'POST' })
    } catch (error) {
      console.log(error)
    }

    setActionLoading('')
  }

  return (
    <section className="pt-32 pb-20 lg:pt-24">
      <div className={'min-h-screen container'}>
        <form
          onSubmit={handleSubmit}
          className="mb-10 gap-3 flex flex-col md:flex-row justify-between items-center"
        >
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold">Buscar visitante</h2>
          <div className="flex">
            <input
              type="text"
              name="search"
              placeholder="Nome, e-mail ou cpf"
              className="px-5 py-2 w-full border-2 border-gray-200 outline-none rounded"
            />
            <button className="px-4 bg-red-500 text-white text-xl">
              <HiMagnifyingGlass />
            </button>
          </div>
        </form>

        {client ? (
          <div className="relative p-5 rounded-lg border-2 border-gray-200 text-center">
            {client.document === null ? (
              <>
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 ">
                  <span className="p-2 rounded-full bg-red-500 text-white text-sm">
                    Cadastro incompleto
                  </span>
                </div>

                <small className="block leading-4 text-gray-400">
                  Esse usuário não possui endereço, documento e data de nascimento preenchidos!
                </small>
              </>
            ) : (
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 ">
                <span className="p-2 rounded-full bg-green-500 text-white text-sm">
                  Cadastro completo
                </span>
              </div>
            )}

            <div className="pt-5">
              <h3 className="text-xl md:text-2xl xl:text-3xl font-bold capitalize">
                {client.name.toLowerCase()}
              </h3>
              <ul>
                <li>{client.email}</li>
                <li>{client.document ? masks.cpf(client.document) : ''}</li>
              </ul>
            </div>

            {client.ordered.length > 1 ? (
              <div className="mt-5">
                <h4 className="font-bold text-lg md:text-xl xl:text-2xl">Últimas compras</h4>
                <ul className="mt-10 gap-10 lg:gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-sm">
                  {client.ordered.map((order) => (
                    <li
                      key={order.code}
                      className="relative p-5 border-2 border-gray-300 text-left rounded"
                    >
                      <span className="absolute top-0 right-3 -translate-y-1/2">
                        <span
                          className={classNames(
                            'inline-block w-28 capitalize text-center rounded-full font-medium',
                            paymentStatus[order.invoice.status.toLowerCase() as PaymentStatus].style
                          )}
                        >
                          {paymentStatus[order.invoice.status.toLowerCase() as PaymentStatus].label}
                        </span>
                      </span>

                      <p>
                        <strong>Código:</strong> {order.code}
                      </p>
                      <p>
                        <strong>Data da compra:</strong>{' '}
                        {new Date(order.created_at).toLocaleString('pt-br', {
                          day: '2-digit',
                          month: '2-digit',
                          year: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                      <p>
                        <strong>Data da utilização:</strong>{' '}
                        {order.used_on ? (
                          <>
                            {new Date(order.used_on).toLocaleString('pt-br', {
                              day: '2-digit',
                              month: '2-digit',
                              year: '2-digit',
                            })}
                          </>
                        ) : (
                          <span>Não utilizado</span>
                        )}
                      </p>
                      <p>
                        <strong>Itens:</strong>
                      </p>
                      {order.item.map((ticket, index) => (
                        <span key={index}>
                          <span className="pl-3 gap-2 flex">
                            <span>{ticket.amount}x</span>
                            <span>{ticket.product.name}</span>
                          </span>
                        </span>
                      ))}

                      {order.invoice.status.toLowerCase() === 'paid' && (
                        <span className="gap-2 grid grid-cols-2 mt-5">
                          <button
                            className="w-full flex justify-center items-center py-2 rounded-lg border-2 border-custom-100 bg-custom-100 font-semibold text-white"
                            onClick={() => tickerUse(order.id)}
                          >
                            {actionLoading === `use_${order.gateway_id}` && <Spin />}
                            Dar baixa
                          </button>
                          <button className="w-full flex justify-center items-center py-2 rounded-lg border-2 border-custom-100 text-custom-100 font-semibold">
                            {actionLoading === `reverse_${order.gateway_id}` && <Spin red />}
                            Estornar
                          </button>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="mt-5 text-sm text-custom-100">Esse usuário nunca efetuou uma compra!</p>
            )}
          </div>
        ) : (
          <>
            {isLoading ? (
              <div className="relative p-5 rounded-lg border-2 border-gray-200 text-center">
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 h-8">
                  <Skeleton width={200} height={25} />
                </div>

                <div className="pt-5">
                  <Skeleton width={400} height={40} />
                  <Skeleton width={300} height={20} />
                  <Skeleton width={300} height={20} />
                </div>

                <div className="mt-10">
                  <Skeleton width={400} height={35} />

                  <ul className="mt-10 gap-10 lg:gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-sm">
                    <li className="relative p-5 border-2 border-gray-300 text-left rounded">
                      <span className="absolute top-0 right-3 -translate-y-1/2">
                        <span
                          className={classNames(
                            'inline-block w-28 capitalize text-center rounded-full font-medium'
                          )}
                        >
                          <Skeleton />
                        </span>
                      </span>
                    </li>
                    <li className="relative p-5 border-2 border-gray-300 text-left rounded">
                      <span className="absolute top-0 right-3 -translate-y-1/2">
                        <span
                          className={classNames(
                            'inline-block w-28 capitalize text-center rounded-full font-medium'
                          )}
                        >
                          <Skeleton />
                        </span>
                      </span>
                    </li>
                    <li className="relative p-5 border-2 border-gray-300 text-left rounded">
                      <span className="absolute top-0 right-3 -translate-y-1/2">
                        <span
                          className={classNames(
                            'inline-block w-28 capitalize text-center rounded-full font-medium'
                          )}
                        >
                          <Skeleton />
                        </span>
                      </span>
                    </li>
                    <li className="relative p-5 border-2 border-gray-300 text-left rounded">
                      <span className="absolute top-0 right-3 -translate-y-1/2">
                        <span
                          className={classNames(
                            'inline-block w-28 capitalize text-center rounded-full font-medium'
                          )}
                        >
                          <Skeleton />
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </section>
  )
}
