import { FetchError } from '@/lib/fetchJson'
import { withSessionRoute } from '@/lib/withSession'
import SessionProps from '@/types/session'
import { NextApiRequest, NextApiResponse } from 'next'

async function userRoute(req: NextApiRequest, res: NextApiResponse<SessionProps>) {
  if (req.session.user) {
    try {
      res.json({
        ...req.session.user,
        isLogged: true,
      })
    } catch (error) {
      if (error instanceof FetchError) {
        console.error(error.message)
      }
      console.error(error)
    }
  } else {
    res.json({
      data: null,
      token: '',
      isLogged: false,
    })
  }
}

export default withSessionRoute(userRoute)
