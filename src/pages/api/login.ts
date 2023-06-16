import api from '@/lib/api'
import { withSessionRoute } from '@/lib/withSession'
import SessionProps from '@/types/session'
import { NextApiRequest, NextApiResponse } from 'next'

async function loginRoute(req: NextApiRequest, res: NextApiResponse<SessionProps | unknown>) {
  const { username, password, recaptcha } = await req.body
  try {
    const data: any = await api.Security.login({
      username,
      password,
      recaptcha,
    })

    const user = {
      data: data.user,
      token: data.token,
      isLogged: true,
    } as SessionProps

    req.session.user = user
    await req.session.save()

    res.json(user)
  } catch (error) {
    res.status(401).json(error)
  }
}

export default withSessionRoute(loginRoute)
