import api from '@/lib/api'
import { withSessionRoute } from '@/lib/withSession'
import SessionProps from '@/types/session'
import { NextApiRequest, NextApiResponse } from 'next'

async function loginRoute(req: NextApiRequest, res: NextApiResponse<SessionProps | unknown>) {
  try {
    res.json(['https://novanicolandia.com.br/images/banners/app.png'])
  } catch (error) {
    res.status(500).json(error)
  }
}

export default withSessionRoute(loginRoute)
