import api from '@/lib/api'
import { withSessionRoute } from '@/lib/withSession'
import { NextApiRequest, NextApiResponse } from 'next'

async function retrieveRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email } = req.body
    const response: any = await fetch(`${process.env.API_BASEURL}/auth/retrieve/${email}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      res.status(200).json(await response.json())
    } else {
      res.status(404).json({ error: 'E-mail não encontrado.' })
    }
  } catch (error) {
    res.json({ error: 'E-mail não encontrado.' })
  }
}

export default withSessionRoute(retrieveRoute)
