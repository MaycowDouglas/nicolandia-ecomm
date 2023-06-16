import { LoginProps } from '@/types/login'
import { Order } from '@/types/order'
import { HTTP_METHOD } from 'next/dist/server/web/http'

import fetchJson, { FetchError } from './fetchJson'

async function request(method: HTTP_METHOD, route: string, body?: BodyInit, token?: string) {
  try {
    const response = await fetchJson(`${process.env.API_BASEURL}${route}`, {
      method,
      credentials: 'include',
      headers: token
        ? {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        : {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
      body,
    })

    return response
  } catch (error) {
    if (error instanceof FetchError) {
      console.error(error.message)
    }
    throw new Error('Erro desconhecido ao fazer a requisição')
  }
}

const api = {
  Order: {
    list: async (token: string) => await request('GET', '/api/order', token),
    create: async (order: Order, token: string) =>
      await request('POST', '/api/order', JSON.stringify(order), token),
  },
  Security: {
    login: async (data: LoginProps) => await request('POST', '/login', JSON.stringify(data)),
  },
}

export default api
