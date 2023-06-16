type AddressProps = {
  id: number
  city: string
  state: string
  street: string
  number: string
  zipcode: string
  neighborhood: string
  complementary?: string
}

export type ViaCepAddress = {
  uf?: string
  cep?: string
  gia?: string
  ddd?: string
  ibge?: string
  siafi?: string
  bairro?: string
  logradouro?: string
  complemento?: string
  localidade?: string
  erro?: boolean
}

export default AddressProps
