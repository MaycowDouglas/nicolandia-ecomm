import AddressProps from './address'
import PhoneProps from './phone'

type UserProps = {
  id: number
  name: string
  email: string
  roles: string[]
  photo: string | null
  active: boolean
  document: string
  phones: PhoneProps[]
  birthday: string
  address: AddressProps
  createdAt: number
}

export default UserProps
