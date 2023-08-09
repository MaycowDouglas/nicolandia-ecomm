import { prisma } from '@/lib/prisma'
import { withSessionRoute } from '@/lib/withSession'
import { NextApiRequest, NextApiResponse } from 'next'

export default withSessionRoute(async function GetClientRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = req.session.user
  const { searchParam } = JSON.parse(req.body)

  if (
    !user ||
    user.isLogged === false ||
    user.data?.email !== String(process.env.NEXT_PUBLIC_OPERATIONAL_MANAGER)
  ) {
    res.status(401).end()
    return
  }

  try {
    const today = new Date()
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(today.getMonth() - 6)

    const result = await prisma.user_profile.findFirst({
      where: {
        OR: [
          { name: { equals: searchParam } },
          { email: { equals: searchParam } },
          { document: { equals: searchParam } },
        ],
      },
      select: {
        name: true,
        document: true,
        email: true,
        ordered: {
          select: {
            code: true,
            used_on: true,
            created_at: true,
            invoice: { select: { payment_method: true, status: true } },
            item: { select: { amount: true, product: { select: { name: true } } } },
          },
          take: 4,
        },
      },
    })
    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    res.status(400).json({})
  }
})
