import { prisma } from '@/lib/prisma'
import { withSessionRoute } from '@/lib/withSession'
import { NextApiRequest, NextApiResponse } from 'next'

export default withSessionRoute(async function GetClientRoute(
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
    const transaction = await prisma.$transaction(async (tx) => {
      const today = new Date()

      const user = await tx.user_profile.findUnique({ where: { id: parseInt(String(id), 10) } })

      if (!user) throw new Error('User not found.')

      const updated = await tx.user_profile.update({
        where: { id: parseInt(String(id), 10) },
        data: { email: `${user.email}.${today.getTime()}`, document: null },
      })

      return true
    })

    res.status(200).json({ transaction })
  } catch (error) {
    console.error(error)
    res.status(400).json({})
  }
})
