import AddressProps from './address'
import PhoneProps from './phone'

type UserProps = {
  id: number
  name: string
  email: string
  roles: string[]
  photo: string | null
  active: boolean
  phones: PhoneProps[]
  address: AddressProps
  document: string
  birthday: string
  createdAt: number
}

export default UserProps
