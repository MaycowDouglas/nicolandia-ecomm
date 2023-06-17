/* eslint-disable @next/next/no-img-element */
import Button from '@/components/atoms/Button'
import Dropdown from '@/components/atoms/Dropdown'
import Overlay from '@/components/atoms/Overlay'
import useOrders from '@/hooks/useOrders'
import useUser from '@/hooks/useUser'
import { classNames } from '@/lib/classNames'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BsQrCodeScan, BsWallet2 } from 'react-icons/bs'
import { FiMoreVertical, FiPrinter, FiX } from 'react-icons/fi'

export default function MyAccount() {
  const { user } = useUser({ redirectTo: '/entrar?redir=/minha-conta' })
  const list = useOrders()
  const router = useRouter()
  const [pix, setPix] = useState('')
  const [isPixVisible, setPixVisible] = useState(false)

  const paymentStatus = {
    PAID: { label: 'pago', style: 'bg-green-400' },
    FAILED: { label: 'falhou', style: 'bg-red-400' },
    REFUSED: { label: 'recusado', style: 'bg-red-400' },
    PENDING: { label: 'pendente', style: 'bg-yellow-400' },
    EXPIRED: { label: 'expirou', style: 'bg-red-400' },
    CANCELED: { label: 'cancelado', style: 'bg-red-400' },
    REFUNDED: { label: 'estornado', style: 'bg-red-400' },
    REFUNDING: { label: 'estornado', style: 'bg-red-400' },
    AUTHORIZED: { label: 'autorizado', style: 'bg-green-400' },
    CHARGEBACK: { label: 'chargeback', style: 'bg-yellow-400' },
    IN_PROTEST: { label: 'protesto', style: 'bg-yellow-400' },
    IN_ANALYSIS: { label: 'analise', style: 'bg-yellow-400' },
    PARTIALLY_PAID: { label: 'parcial', style: 'bg-yellow-400' },
    WAITING_PAYMENT: { label: 'aguardando', style: 'bg-yellow-400' },
  }

  const paymentMethod = {
    PIX: 'Pix',
    BOLETO: 'Boleto',
    CREDIT_CARD: 'Cartão de Crédito',
  }

  function showCode(code: string) {
    setPix(`https://chart.googleapis.com/chart?cht=qr&chl=${encodeURI(code)}&chs=250x250`)
    setPixVisible(true)
  }

  return (
    <>
      {isPixVisible && (
        <>
          <Overlay onClick={() => setPixVisible(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-80 pt-5 grid place-content-center bg-white">
            <FiX
              onClick={() => setPixVisible(false)}
              className="absolute top-3 right-3 text-2xl text-slate-500 cursor-pointer"
            />

            <img src={pix} alt="" />

            <p className="text-center text-2xl mb-5">
              {pix
                .replace('https://chart.googleapis.com/chart?cht=qr&chl=', '')
                .replace('&chs=250x250', '')}
            </p>
          </div>
        </>
      )}
      <section className="py-10 min-h-screen">
        <div className="container">
          <h1 className="text-4xl text-center lg:text-start text-gray-500 font-bold">
            Minhas compras
          </h1>

          <div className="mt-2 mb-10 border-2 border-neutral-100"></div>

          {list.data && (
            <table className="w-full">
              <thead>
                <tr>
                  <th>Status</th>
                  <th className="hidden md:table-cell">Pagamento</th>
                  <th className="hidden md:table-cell">Valor</th>
                  <th>Data compra</th>
                  <th>Data uso</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {list.data.length < 1 ? (
                  <tr className="bg-slate-200">
                    <td colSpan={6} className="py-20">
                      <span className="flex flex-col items-center">
                        <span className="text-2xl mb-3">Você não possui nenhuma compra</span>
                        <Button href="/passaportes">Veja nossos passaportes</Button>
                      </span>
                    </td>
                  </tr>
                ) : (
                  <>
                    {list.data.map((order, index) => (
                      <tr key={index}>
                        <td className="p-1">
                          <span
                            className={classNames(
                              'py-1 px-2 inline-flex justify-center rounded-full font-medium text-sm',
                              paymentStatus[order.invoice.status].style
                            )}
                          >
                            {paymentStatus[order.invoice.status].label}
                          </span>
                        </td>
                        <td className="hidden md:table-cell">
                          {paymentMethod[order.invoice.paymentMethod]}
                        </td>
                        <td className="hidden md:table-cell">
                          {(
                            order.items.reduce((total, current) => total + current.total, 0) / 100
                          ).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </td>
                        <td>{new Date(order.createdAt.date).toLocaleDateString()}</td>
                        <td>
                          {order.usedOn ? new Date(order.usedOn.date).toLocaleDateString() : '---'}
                        </td>
                        <td>
                          <Dropdown label={<FiMoreVertical />}>
                            <ul className="text-left divide-y-2">
                              {order.invoice.status === 'PAID' && (
                                <li className="py-2">
                                  <button
                                    onClick={() => showCode(order.code)}
                                    className="inline-flex items-center gap-2 whitespace-nowrap"
                                  >
                                    <BsQrCodeScan />
                                    Ver código
                                  </button>
                                </li>
                              )}
                              {order.invoice.status === 'WAITING_PAYMENT' && (
                                <>
                                  {order.invoice.paymentMethod === 'PIX' && (
                                    <li className="py-2">
                                      <button
                                        onClick={() => {
                                          router.push({
                                            pathname: `/pagamento/${order.invoice.paymentMethod.toLowerCase()}/${
                                              order.id
                                            }`,
                                            query: { order: JSON.stringify(order) },
                                          })
                                        }}
                                        className="inline-flex items-center gap-2 whitespace-nowrap"
                                      >
                                        <BsWallet2 />
                                        Pagar Pix
                                      </button>
                                    </li>
                                  )}
                                  {order.invoice.paymentMethod === 'BOLETO' && (
                                    <li className="py-2">
                                      <button
                                        onClick={() => {
                                          router.push({
                                            pathname: `/pagamento/${order.invoice.paymentMethod.toLowerCase()}/${
                                              order.id
                                            }`,
                                            query: { order: JSON.stringify(order) },
                                          })
                                        }}
                                        className="inline-flex items-center gap-2 whitespace-nowrap"
                                      >
                                        <FiPrinter />
                                        Imprimir boleto
                                      </button>
                                    </li>
                                  )}
                                </>
                              )}
                            </ul>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </>
  )
}
