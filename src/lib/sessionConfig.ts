// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type SessionProps from '@/types/session'
import type { IronSessionOptions } from 'iron-session'

export const sessionOptions: IronSessionOptions = {
  ttl: 900,
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'Nicolandia@Authentication',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    user?: SessionProps
  }
}
