import { prisma } from '@/lib/prisma'
import { withSessionRoute } from '@/lib/withSession'
import { NextApiRequest, NextApiResponse } from 'next'

export default withSessionRoute(async function GetClientRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { authorization } = req.headers

    const transaction = await prisma.$transaction(async (tx) => {
      const today = new Date()
      const user = await tx.user_profile.findUnique({
        where: { api_token: String(authorization).replace('Bearer ', '') },
      })

      if (!user) throw new Error('User not found.')

      const updated = await tx.user_profile.update({
        where: { api_token: String(authorization).replace('Bearer ', '') },
        data: { email: `${user.email}.${today.getTime()}`, document: null },
      })

      return updated
    })

    res.status(200).json({ transaction })
  } catch (error) {
    console.error(error)
    res.status(400).json({})
  }
})
