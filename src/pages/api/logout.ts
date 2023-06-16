import { withSessionRoute } from '@/lib/withSession'
import SessionProps from '@/types/session'
import { NextApiRequest, NextApiResponse } from 'next'

function logoutRoute(req: NextApiRequest, res: NextApiResponse<SessionProps>) {
  req.session.destroy()
  res.status(403).json({
    data: null,
    token: '',
    isLogged: false,
  })
}

export default withSessionRoute(logoutRoute)
