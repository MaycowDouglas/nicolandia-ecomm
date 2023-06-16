import api from '@/lib/api'
import fetchJson from '@/lib/fetchJson'
import { withSessionRoute } from '@/lib/withSession'
import { OrderListResponse } from '@/types/order'
import SessionProps from '@/types/session'
import { NextApiRequest, NextApiResponse } from 'next'

export default withSessionRoute(async function OrderCreateRoute(
  req: NextApiRequest,
  res: NextApiResponse<OrderListResponse>
) {
  const user = req.session.user

  if (!user || user.isLogged === false) {
    res.status(401).end()
    return
  }

  try {
    const data: OrderListResponse = await fetchJson(`${process.env.API_BASEURL}/api/order`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    })
    res.status(201).json(data)
  } catch (error) {
    console.error(error)
    res.status(401).json({} as OrderListResponse)
  }
})
