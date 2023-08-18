import { prisma } from '@/lib/prisma'
import { withSessionRoute } from '@/lib/withSession'
import { NextApiRequest, NextApiResponse } from 'next'

function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export default withSessionRoute(async function OrderCreateRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = req.session.user
  const { id } = req.query

  if (!user || user.isLogged === false) {
    res.status(401).end()
    return
  }

  try {
    await prisma.ordered.update({
      where: { id: parseInt(String(id)) },
      data: { used_on: formatDate(new Date()) },
    })

    res.status(201).json(true)
  } catch (error) {
    res.status(401).json(false)
  }
})
