/* eslint-disable @next/next/no-img-element */
import Button from '@/components/atoms/Button'
import { useFeedback } from '@/hooks/useFeedback'
import { OrderListItemResponse, OrderResponse } from '@/types/order'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FiCopy } from 'react-icons/fi'

export default function PaymentPixPage() {
  const router = useRouter()
  const { order } = router.query
  const { addFeedback } = useFeedback()

  const orderDecoded: OrderResponse | OrderListItemResponse = order
    ? JSON.parse(decodeURIComponent(order as string))
    : ({} as OrderResponse)

  useEffect(() => {
    if (!order) {
      router.push('/')
    }
  }, [order, router])

  const qrcode = orderDecoded.invoice
    ? `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURI(
        orderDecoded.invoice.boleto
      )}&chs=250x250`
    : ''

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text)

    addFeedback({ message: 'Texto copiado!' })
  }

  return order ? (
    <>
      {'total' in orderDecoded ? (
        <section className="py-10">
          <div className="container">
            <h1 className="text-4xl text-center lg:text-start text-gray-500 font-bold">
              # Pedido {orderDecoded.id}
            </h1>

            <div className="mt-2 mb-10 border-2 border-neutral-100"></div>
            <div className="max-w-xs mx-auto">
              <div>
                <img src={qrcode} className="w-full h-auto mb-2" width={250} height={250} alt="" />
                <Button
                  isBlock
                  theme="secondary"
                  onClick={() => handleCopyText(orderDecoded.invoice.boleto)}
                >
                  Copiar <FiCopy />{' '}
                </Button>
              </div>

              <div className="mt-5 space-y-1">
                <p>
                  <strong>Total à pagar:</strong>{' '}
                  {(orderDecoded.total / 100).toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </p>
                <p>
                  <strong>Data da compra:</strong>{' '}
                  {new Date(orderDecoded.createdAt * 1000).toLocaleDateString()}
                </p>
                <p>
                  <strong>Items adquiridos:</strong>
                </p>
                <ul className="pl-5">
                  {orderDecoded.items.map((item, index) => (
                    <li key={index} className="inline-flex flex-col items-center">
                      <span>
                        {item.amount} x {item.product_name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-10">
          <div className="container">
            <h1 className="text-4xl text-center lg:text-start text-gray-500 font-bold">
              # Pedido {orderDecoded.id}
            </h1>

            <div className="mt-2 mb-10 border-2 border-neutral-100"></div>
            <div className="max-w-xs mx-auto">
              <div>
                <img src={qrcode} className="w-full h-auto mb-2" width={250} height={250} alt="" />
                <Button
                  isBlock
                  theme="secondary"
                  onClick={() => handleCopyText(orderDecoded.invoice.boleto)}
                >
                  Copiar <FiCopy />{' '}
                </Button>
              </div>

              <div className="mt-5 space-y-1">
                <p>
                  <strong>Total à pagar:</strong>{' '}
                  {(orderDecoded.items.reduce((t, c) => t + c.total, 0) / 100).toLocaleString(
                    'pt-br',
                    {
                      style: 'currency',
                      currency: 'BRL',
                    }
                  )}
                </p>
                <p>
                  <strong>Data da compra:</strong>{' '}
                  {new Date(orderDecoded.createdAt.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Items adquiridos:</strong>
                </p>
                <ul className="pl-5">
                  {orderDecoded.items.map((item, index) => (
                    <li key={index} className="inline-flex flex-col items-center">
                      <span>
                        {item.amount} x {item.productName}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  ) : (
    <></>
  )
}
