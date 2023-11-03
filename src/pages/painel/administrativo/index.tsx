import useUser from '@/hooks/useUser'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'

type Response = {
  sales: {
    total: string | null
    byTicket:
      | {
          name: string
          total: string
        }[]
      | null
  }
  validated: {
    total: string | null
    byTicket:
      | {
          name: string
          total: string
        }[]
      | null
  }
}

export default function DashboardOperational() {
  const router = useRouter()
  const firstAccess = useRef<boolean>(true)
  const { user } = useUser({ redirectTo: '/entrar?redir=/painel' })

  const [report, setReport] = useState<Response>({} as Response)
  const [selectedDate, selectDate] = useState<any>('')

  useEffect(() => {
    if (user && user.data?.email !== String(process.env.NEXT_PUBLIC_ADMINISTRATIVE_MANAGER)) {
      router.push('/painel')
    }
  }, [user, router])

  useEffect(() => {
    async function getData() {
      try {
        const date = new Date()
        const formatDate = date.toLocaleDateString().split('/')
        selectDate(`${formatDate[2]}-${formatDate[1]}-${formatDate[0]}`)

        const res = await fetch(`/api/report/${date.toLocaleDateString()}`)
        const data: Response = await res.json()

        setReport(data)
      } catch (error) {
        console.log(error)
      }
    }

    if (firstAccess.current) {
      getData()
      firstAccess.current = false
    }
  }, [])

  const handleDataChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const valuePieces = value.split('-')

    const currentDate = new Date().toISOString().slice(5, 7)

    const formatedDate = `${valuePieces[2]}/${valuePieces[1]}/${valuePieces[0]}`

    selectDate(value)

    const res = await fetch(`/api/report/${formatedDate}`)
    const data = await res.json()

    setReport(data)
  }, [])

  return (
    <>
      <section className="pt-32 pb-20 lg:pt-24">
        <div className="container">
          <input
            type="date"
            onChange={handleDataChange}
            value={selectedDate}
            className="border-2 border-zinc-300 px-3 py-1 rounded mx-auto md:mr-0 block"
          />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <div className="mt-10">
              <h2 className="mb-5 text-center font-bold text-lg md:text-xl xl:text-2xl">
                Baixas do dia
              </h2>
              <table className="border w-full">
                <thead>
                  <tr className="hidden md:table-row">
                    <th className="px-4"></th>
                    <th className="px-4"></th>
                  </tr>
                </thead>

                {report.sales && (
                  <tbody>
                    {report.validated.byTicket?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.total}</td>
                      </tr>
                    ))}
                    <tr>
                      <td>
                        <strong>Total</strong>
                      </td>
                      <td>{report.validated.total}</td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
            <div className="mt-10">
              <h2 className="mb-5 text-center font-bold text-lg md:text-xl xl:text-2xl">
                Vendas do dia
              </h2>
              <table className="border w-full">
                <thead>
                  <tr className="hidden md:table-row">
                    <th className="px-4"></th>
                    <th className="px-4"></th>
                  </tr>
                </thead>

                {report.sales && (
                  <tbody>
                    {report.sales.byTicket?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.total}</td>
                      </tr>
                    ))}
                    <tr>
                      <td>
                        <strong>Total</strong>
                      </td>
                      <td>{report.sales.total}</td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
