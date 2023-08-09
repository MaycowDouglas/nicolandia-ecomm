import 'react-loading-skeleton/dist/skeleton.css'

import useUser from '@/hooks/useUser'
import useVisitors from '@/hooks/useVisitors'
import { classNames } from '@/lib/classNames'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import Skeleton from 'react-loading-skeleton'

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

export default function DashboardOperational() {
  const router = useRouter()
  const { user } = useUser({ redirectTo: '/entrar?redir=/painel' })
  const [params, setParams] = useState({
    salesDay: 1,
    salesMonth: 0,
  })

  const { data: sales, isLoading: salesLoading } = useVisitors(params.salesMonth, params.salesDay)

  useEffect(() => {
    if (user && user.data?.email !== String(process.env.NEXT_PUBLIC_ADMINISTRATIVE_MANAGER)) {
      router.push('/painel')
    }
  }, [user, router])

  const handleSalesDataChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    let name = e.currentTarget.name
    let value = e.currentTarget.value
    setParams((prev) => ({ ...prev, [name]: parseInt(value) }))
  }, [])

  console.log(sales)

  return (
    <section className="pt-32 pb-20 lg:pt-24">
      <div className="container grid grid-cols-1 xl:grid-cols-2">
        <div className="relative border p-5 shadow">
          <div className="absolute top-0 right-5 -translate-y-1/2 flex items-center">
            <select
              id="salesMonth"
              name="salesMonth"
              value={params.salesMonth}
              onChange={handleSalesDataChange}
              className={classNames(
                'w-32 px-3 py-2',
                'cursor-pointer',
                'border-0 outline-none border-gray-300 bg-white appearance-none font-bold'
              )}
            >
              <option value="0">Janeiro</option>
              <option value="1">Fevereiro</option>
              <option value="2">Março</option>
              <option value="3">Abril</option>
              <option value="4">Maio</option>
              <option value="5">Junho</option>
              <option value="6">Julho</option>
              <option value="7">Agosto</option>
              <option value="8">Setembro</option>
              <option value="9">Outubro</option>
              <option value="10">Novembro</option>
              <option value="11">Dezembro</option>
            </select>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FiChevronDown className="text-gray-500" />
            </div>
          </div>
          <h2 className="mb-5 text-center font-bold text-lg md:text-xl xl:text-2xl">
            Vendas do mês {months[params.salesMonth]}
          </h2>
          <table className="w-full">
            <thead>
              <tr className="hidden md:table-row">
                <th className="px-4">Ano</th>
                <th className="px-4">Total vendido</th>
                <th className="px-4">Passaportes vendidos</th>
                <th className="px-4">Passaportes validados</th>
              </tr>
            </thead>
            {sales && (
              <tbody className="text-center">
                {salesLoading ? (
                  <>
                    <tr>
                      <Skeleton />
                    </tr>
                    <tr>
                      <Skeleton />
                    </tr>
                  </>
                ) : (
                  <>
                    <tr>
                      <td className="px-4">{new Date().getFullYear()}</td>
                      <td className="px-4">{sales.currentYear.totalSold}</td>
                      <td className="px-4">
                        {sales.currentYear.totalTicketsSold.toLocaleString('pt-br')}
                      </td>
                      <td className="px-4">
                        {sales.currentYear.totalTicketsValidated.toLocaleString('pt-br')}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4">{new Date().getFullYear() - 1}</td>
                      <td className="px-4">{sales.lastYear.totalSold}</td>
                      <td className="px-4">
                        {sales.lastYear.totalTicketsSold.toLocaleString('pt-br')}
                      </td>
                      <td className="px-4">
                        {sales.lastYear.totalTicketsValidated.toLocaleString('pt-br')}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            )}
          </table>
        </div>

        <div className="relative border p-5 shadow">
          <div className="absolute top-0 right-5 -translate-y-1/2 flex items-center">
            <select
              id="salesDay"
              name="salesDay"
              value={params.salesDay}
              onChange={handleSalesDataChange}
              className={classNames(
                'w-16 px-3 py-2',
                'cursor-pointer',
                'border-0 outline-none border-gray-300 bg-white appearance-none font-bold'
              )}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FiChevronDown className="text-gray-500" />
            </div>
          </div>
          <h2 className="mb-5 text-center font-bold text-lg md:text-xl xl:text-2xl">
            Vendas do dia {params.salesDay} de {months[params.salesMonth]}
          </h2>
          <table className="w-full">
            <thead>
              <tr className="hidden md:table-row">
                <th className="px-4">Passaporte</th>
                <th className="px-4">Total</th>
                <th className="px-4">Vendidos</th>
              </tr>
            </thead>
            {sales && (
              <tbody className="text-center">
                {sales.daySales.dayPaidSales.map((passport) => (
                  <tr key={passport.product_name}>
                    <td>{passport.product_name}</td>
                    <td>
                      {(passport._sum.total / 100).toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>
                    <td>{passport._sum.amount}</td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td className="font-bold">
                    {(
                      sales.daySales.dayPaidSales.reduce(
                        (total, current) => total + current._sum.total,
                        0
                      ) / 100
                    ).toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </td>
                  <td className="font-bold">
                    {sales.daySales.dayPaidSales.reduce(
                      (total, current) => total + current._sum.amount,
                      0
                    )}
                  </td>
                </tr>
              </tbody>
            )}
          </table>

          <h2 className="my-5 text-center font-bold text-lg md:text-xl xl:text-2xl">
            Baixas do dia {params.salesDay} de {months[params.salesMonth]}
          </h2>

          <table className="w-full">
            <thead>
              <tr className="hidden md:table-row">
                <th className="px-4">Passaporte</th>
                <th className="px-4">Validados</th>
              </tr>
            </thead>
            {sales && (
              <tbody className="text-center">
                {sales.daySales.dayUsedSales.map((passport) => (
                  <tr key={passport.product_name}>
                    <td>{passport.product_name}</td>
                    <td>{passport._sum.amount}</td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td className="font-bold">
                    {sales.daySales.dayUsedSales.reduce(
                      (total, current) => total + current._sum.amount,
                      0
                    )}
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </section>
  )
}
