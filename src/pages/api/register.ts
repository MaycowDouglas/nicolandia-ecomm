import api from '@/lib/api'
import { withSessionRoute } from '@/lib/withSession'
import { NextApiRequest, NextApiResponse } from 'next'

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, password, recaptcha } = await req.body
  try {
    const data: any = await api.Security.register({ name, email, password, recaptcha })

    res.json(data)
  } catch (error) {
    res.status(401).json(error)
  }
}

export default withSessionRoute(loginRoute)
