import UserProps from './user'

type SessionProps = {
  data: UserProps | null
  token: string | null
  isLogged: boolean
}

export default SessionProps
