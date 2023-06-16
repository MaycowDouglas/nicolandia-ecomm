import fetchJson from '@/lib/fetchJson'
import { withSessionRoute } from '@/lib/withSession'
import SessionProps from '@/types/session'
import { NextApiRequest, NextApiResponse } from 'next'

export default withSessionRoute(async function OrderCreateRoute(
  req: NextApiRequest,
  res: NextApiResponse<SessionProps | unknown>
) {
  const user = req.session.user
  const { order } = await req.body

  if (!user || user.isLogged === false) {
    res.status(401).end()
    return
  }

  try {
    const data = await fetchJson(`${process.env.API_BASEURL}/api/order`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(req.body),
    })

    res.status(201).json(data)
  } catch (error) {
    console.error(error)
    res.status(401).json(error)
  }
})
