import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'
import { NextApiHandler } from 'next'

import { sessionOptions } from './sessionConfig'

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions)
}
