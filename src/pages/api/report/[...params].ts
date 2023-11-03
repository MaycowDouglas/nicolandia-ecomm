import { prisma } from '@/lib/prisma'
import { withSessionRoute } from '@/lib/withSession'
import { NextApiRequest, NextApiResponse } from 'next'

type Response = {
  sales: {
    day: {
      byTickets:
        | {
            name: string
            total: string
          }[]
        | null
      total: string | null
    }
    month: {
      currentYear: {
        byTickets:
          | {
              name: string
              total: string
            }[]
          | null
        total: string | null
      }
      previousYear: {
        byTickets:
          | {
              name: string
              total: string
            }[]
          | null
        total: string | null
      }
    }
  }
}

function toMoney(value: number | null): string {
  const res = value ? value / 100 : 0

  return res.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default withSessionRoute(async function GetSalesRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = req.session.user
    const params = req.query.params

    if (
      !user ||
      user.isLogged === false ||
      user.data?.email !== String(process.env.NEXT_PUBLIC_ADMINISTRATIVE_MANAGER)
    ) {
      res.status(401).end()
      return
    }

    if (Array.isArray(params)) {
      const [d, m, y] = params

      const day = parseInt(d, 10),
        month = parseInt(m, 10),
        year = parseInt(y, 10)

      const daySales = await prisma.item.aggregate({
        _sum: { total: true },
        _count: { id: true },
        where: {
          ordered: {
            created_at: {
              gt: new Date(year, month - 1, day, 0, 0, 0),
              lt: new Date(year, month - 1, day, 23, 59, 59),
            },
            invoice: {
              status: 'PAID',
            },
          },
        },
      })

      const dayValidated = await prisma.item.aggregate({
        _count: { id: true },
        where: {
          ordered: {
            used_on: {
              gt: new Date(year, month - 1, day, 0, 0, 0),
              lt: new Date(year, month - 1, day, 23, 59, 59),
            },
          },
        },
      })

      const daySalesByTicket = await prisma.item.groupBy({
        by: ['product_name'],
        _count: { order_id: true },
        _sum: { amount: true, total: true },
        where: {
          ordered: {
            created_at: {
              gt: new Date(year, month - 1, day, 0, 0, 0),
              lt: new Date(year, month - 1, day, 23, 59, 59),
            },
            invoice: {
              status: 'PAID',
            },
          },
        },
        orderBy: { _sum: { total: 'asc' } },
      })

      const dayValidatedByTicket = await prisma.item.groupBy({
        by: ['product_name'],
        _count: { order_id: true },
        where: {
          ordered: {
            used_on: {
              gt: new Date(year, month - 1, day, 0, 0, 0),
              lt: new Date(year, month - 1, day, 23, 59, 59),
            },
          },
        },
        orderBy: { _sum: { total: 'asc' } },
      })

      res.json({
        sales: {
          byTicket: daySalesByTicket.map((item) => ({
            name: item.product_name ? item.product_name : '',
            total: item._sum.total ? toMoney(item._sum.total) : '',
          })),
          total: toMoney(daySales._sum.total),
        },
        validated: {
          byTicket: dayValidatedByTicket.map((item) => ({
            name: item.product_name ? item.product_name : '',
            total: item._count.order_id ? item._count.order_id : '',
          })),
          total: dayValidated._count.id,
        },
      })
    } else {
      throw new Error('Parâmetros inválidos')
    }
  } catch (error) {}
  // try {
  //   const user = req.session.user
  //   const params = req.query.params

  //   if (
  //     !user ||
  //     user.isLogged === false ||
  //     user.data?.email !== String(process.env.NEXT_PUBLIC_ADMINISTRATIVE_MANAGER)
  //   ) {
  //     res.status(401).end()
  //     return
  //   }

  //   if (Array.isArray(params)) {
  //     const [d, m, y] = params

  //     const getTicketsSoldedCurrentYear = await prisma.item.groupBy({
  //       by: ['product_name'],
  //       _count: { order_id: true },
  //       _sum: { amount: true, total: true },
  //       where: {
  //         ordered: {
  //           created_at: {
  //             gt: new Date(parseInt(y, 10), parseInt(m) - 1, 1, 0, 0, 0),
  //             lt: new Date(parseInt(y, 10), parseInt(m), 0, 23, 59, 59),
  //           },
  //           invoice: {
  //             status: 'PAID',
  //           },
  //         },
  //       },
  //       orderBy: { _sum: { total: 'asc' } },
  //     })

  //     const getTicketsSoldedLastYear = await prisma.item.groupBy({
  //       by: ['product_name'],
  //       _count: { order_id: true },
  //       _sum: { amount: true, total: true },
  //       where: {
  //         ordered: {
  //           created_at: {
  //             gt: new Date(parseInt(y, 10), parseInt(m) - 1, 1, 0, 0, 0),
  //             lt: new Date(parseInt(y, 10), parseInt(m), 0, 23, 59, 59),
  //           },
  //           invoice: {
  //             status: 'PAID',
  //           },
  //         },
  //       },
  //       orderBy: { _sum: { total: 'asc' } },
  //     })

  //     const dayPaidSales = await prisma.item.groupBy({
  //       by: ['product_name'],
  //       _count: { order_id: true },
  //       _sum: { amount: true, total: true },
  //       where: {
  //         ordered: {
  //           created_at: {
  //             gt: new Date(parseInt(y, 10), parseInt(m) - 1, parseInt(d), 0, 0, 0),
  //             lt: new Date(parseInt(y, 10), parseInt(m) - 1, parseInt(d), 23, 59, 59),
  //           },
  //           invoice: {
  //             status: 'PAID',
  //           },
  //         },
  //       },
  //       orderBy: { _sum: { total: 'asc' } },
  //     })

  //     let result: Response = {
  //       sales: {
  //         day: {
  //           byTickets: [],
  //           total: (
  //             dayPaidSales.reduce(
  //               (total, current) => (!current._sum.total ? total + 0 : total + current._sum.total),
  //               0
  //             ) / 100
  //           ).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
  //         },
  //         month: {
  //           currentYear: {
  //             byTickets: [],
  //             total: (
  //               getTicketsSoldedCurrentYear.reduce(
  //                 (total, current) =>
  //                   !current._sum.total ? total + 0 : total + current._sum.total,
  //                 0
  //               ) / 100
  //             ).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
  //           },
  //           previousYear: {
  //             byTickets: [],
  //             total: (
  //               getTicketsSoldedLastYear.reduce(
  //                 (total, current) =>
  //                   !current._sum.total ? total + 0 : total + current._sum.total,
  //                 0
  //               ) / 100
  //             ).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
  //           },
  //         },
  //       },
  //     }
  //     const ticketsCurrentYear = getTicketsSoldedCurrentYear.map((item) => ({
  //       name: item.product_name ? item.product_name : '',
  //       total: item._sum.total
  //         ? (item._sum.total / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  //         : '',
  //     }))
  //     const ticketsLastYear = getTicketsSoldedLastYear.map((item) => ({
  //       name: item.product_name ? item.product_name : '',
  //       total: item._sum.total
  //         ? (item._sum.total / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  //         : '',
  //     }))
  //     const ticketsCurrentDay = dayPaidSales.map((item) => ({
  //       name: item.product_name ? item.product_name : '',
  //       total: item._sum.total
  //         ? (item._sum.total / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  //         : '',
  //     }))
  //     result.sales.day.byTickets = ticketsCurrentDay
  //     result.sales.month.currentYear.byTickets = ticketsCurrentYear
  //     result.sales.month.previousYear.byTickets = ticketsLastYear

  //     res.status(200).json(result)
  //   } else {
  //     throw new Error('Parâmetros inválidos')
  //   }
  // } catch (error) {
  //   console.log(error)
  //   res.status(400).json(error)
  // }
})
