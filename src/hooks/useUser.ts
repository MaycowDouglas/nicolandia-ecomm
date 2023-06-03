import SessionProps from '@/types/session'
import Router from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'

export default function useUser({ redirectTo = '', redirectIfFound = false } = {}) {
  const { data: user, mutate: mutateUser } = useSWR<SessionProps>('/api/user')

  useEffect(() => {
    if (!redirectTo || !user) return

    if (
      (redirectTo && !redirectIfFound && !user?.isLogged) ||
      (redirectIfFound && user?.isLogged)
    ) {
      Router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo])

  return { user, mutateUser }
}
