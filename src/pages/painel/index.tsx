import useUser from '@/hooks/useUser'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function Dashboard() {
  const router = useRouter()
  const { user } = useUser({ redirectTo: '/entrar?redir=/painel' })

  useEffect(() => {
    if (user && user.data) {
      switch (user.data.email) {
        case String(process.env.NEXT_PUBLIC_ADMINISTRATIVE_MANAGER):
          router.push('/painel/administrativo')
          break

        case String(process.env.NEXT_PUBLIC_OPERATIONAL_MANAGER):
          router.push('/painel/operacional')
          break

        default:
          router.push('/painel/cliente')
          break
      }
    }
  }, [router, user])

  return <div className="py-20"></div>
}
