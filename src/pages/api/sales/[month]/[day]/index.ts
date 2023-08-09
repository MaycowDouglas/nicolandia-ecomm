import { prisma } from '@/lib/prisma'
import { withSessionRoute } from '@/lib/withSession'
import { NextApiRequest, NextApiResponse } from 'next'

export default withSessionRoute(async function GetClientRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = req.session.user
  if (
    !user ||
    user.isLogged === false ||
    user.data?.email !== String(process.env.NEXT_PUBLIC_ADMINISTRATIVE_MANAGER)
  ) {
    res.status(401).end()
    return
  }

  const { month, day } = req.query

  try {
    const currentDate = new Date()
    currentDate.setHours(currentDate.getHours() + 3)
    const currentYear = currentDate.getFullYear()
    const dynamicDay = !day ? 1 : parseInt(String(day))
    const dynamicMonth = !month ? 0 : parseInt(String(month))

    const getTicketsUsedOnCurrentYear = await prisma.item.groupBy({
      by: ['product_name'],
      _count: { order_id: true },
      _sum: { amount: true, total: true },
      where: {
        ordered: {
          used_on: {
            gt: new Date(currentYear, dynamicMonth, 1),
            lt: new Date(currentYear, dynamicMonth + 1, 0),
          },
        },
      },
      orderBy: { product_name: 'asc' },
    })

    const getTicketsUsedOnLastYear = await prisma.item.groupBy({
      by: ['product_name'],
      _count: { order_id: true },
      _sum: { amount: true, total: true },
      where: {
        ordered: {
          used_on: {
            gt: new Date(currentYear - 1, dynamicMonth, 0),
            lt: new Date(currentYear - 1, dynamicMonth + 1, 1),
          },
        },
      },
      orderBy: { product_name: 'asc' },
    })

    const getTicketsPaidOnCurrentYear = await prisma.item.groupBy({
      by: ['product_name'],
      _count: { order_id: true },
      _sum: { amount: true, total: true },
      where: {
        ordered: {
          created_at: {
            gt: new Date(currentYear, dynamicMonth, 0),
            lt: new Date(currentYear, dynamicMonth + 1, 1),
          },
          invoice: {
            status: 'PAID',
          },
        },
      },
      orderBy: { product_name: 'asc' },
    })

    const getTicketsPaidOnLastYear = await prisma.item.groupBy({
      by: ['product_name'],
      _count: { order_id: true },
      _sum: { amount: true, total: true },
      where: {
        ordered: {
          created_at: {
            gt: new Date(currentYear - 1, dynamicMonth, 0),
            lt: new Date(currentYear - 1, dynamicMonth + 1, 1),
          },
          invoice: {
            status: 'PAID',
          },
        },
      },
      orderBy: { product_name: 'asc' },
    })

    const dayPaidSales = await prisma.item.groupBy({
      by: ['product_name'],
      _count: { order_id: true },
      _sum: { amount: true, total: true },
      where: {
        ordered: {
          created_at: {
            gt: new Date(currentYear, dynamicMonth, dynamicDay, 0, 0, 0),
            lt: new Date(currentYear, dynamicMonth, dynamicDay, 23, 59, 59),
          },
          invoice: {
            status: 'PAID',
          },
        },
      },
      orderBy: { product_name: 'asc' },
    })

    const dayUsedSales = await prisma.item.groupBy({
      by: ['product_name'],
      _count: { order_id: true },
      _sum: { amount: true, total: true },
      where: {
        ordered: {
          used_on: {
            gt: new Date(currentYear, dynamicMonth, dynamicDay, 0, 0, 0),
            lt: new Date(currentYear, dynamicMonth, dynamicDay, 23, 59, 59),
          },
        },
      },
      orderBy: { _sum: { amount: 'asc' } },
    })

    let result = {
      currentYear: {
        totalSold: (
          getTicketsPaidOnCurrentYear.reduce(
            (total, current) => (!current._sum.total ? total + 0 : total + current._sum.total),
            0
          ) / 100
        ).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
        totalTicketsSold: getTicketsPaidOnCurrentYear.reduce(
          (total, current) => (!current._sum.amount ? total + 0 : total + current._sum.amount),
          0
        ),
        totalTicketsValidated: getTicketsUsedOnCurrentYear.reduce(
          (total, current) => (!current._sum.amount ? total + 0 : total + current._sum.amount),
          0
        ),
      },
      lastYear: {
        totalSold: (
          getTicketsPaidOnLastYear.reduce(
            (total, current) => (!current._sum.total ? total + 0 : total + current._sum.total),
            0
          ) / 100
        ).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
        totalTicketsSold: getTicketsPaidOnLastYear.reduce(
          (total, current) => (!current._sum.amount ? total + 0 : total + current._sum.amount),
          0
        ),
        totalTicketsValidated: getTicketsUsedOnLastYear.reduce(
          (total, current) => (!current._sum.amount ? total + 0 : total + current._sum.amount),
          0
        ),
      },
      daySales: {
        dayPaidSales,
        dayUsedSales,
      },
    }

    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    res.status(400).json({})
  }
})
