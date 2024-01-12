import { prisma } from '@/lib/prisma'
import { withSessionRoute } from '@/lib/withSession'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function removeUserRoute(req: NextApiRequest, res: NextApiResponse) {
  const today = new Date()

  const { authorization } = req.headers
  const authorizationPayload = String(authorization).split('.')[1]
  const decodedToken = Buffer.from(authorizationPayload, 'base64')
    .toString('utf-8')
    .replaceAll('"', '')

  res.status(200).json({ decodedToken })

  // try {
  //   const user = await prisma.user_profile.findUnique({
  //     where: { api_token: decodedToken },
  //   })

  //   if (!user) throw new Error('User not found.')

  //   const updated = await prisma.user_profile.update({
  //     where: { api_token: decodedToken },
  //     data: { email: `${user.email}.${today.getTime()}`, document: null },
  //   })

  //   res.status(200).json({ updated })
  // } catch (error) {
  //   console.error(error)
  //   res.status(400).json({ error, decodedToken })
  // }
}
