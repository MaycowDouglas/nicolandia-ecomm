export type Order = {
  items?: OrderItemProps[]
  company?: number
  invoice?: OrderInvoiceProps
  customer?: OrderCustomerProps
  recaptcha?: string | null
}

export type OrderItemProps = {
  amount?: number
  product?: number
}

export type OrderPhoneProps = {
  ddd?: string
  number?: string
}

export type OrderInvoiceProps = {
  creditCard?: string
  installments?: number
  paymentMethod?: 'PIX' | 'BOLETO'
}

export type OrderAddressProps = {
  city?: string
  state?: string
  street?: string
  number?: string
  zipcode?: string
  neighborhood?: string
  complementary?: string
}

export type OrderCustomerProps = {
  id?: number
  name?: string
  email?: string
  phones?: OrderPhoneProps[]
  address?: OrderAddressProps
  document?: string
  birthday?: string
}

export type OrderResponse = {
  id: number
  users: []
  total: number
  status: boolean
  invoice: {
    id: number
    payor: string | null
    status: string
    boleto: string
    invoce: string | null
    discount: string | null
    installments: string
    paymentMethod: string
  }
  customer: {
    id: number
    name: string
    email: string
    roles: string[]
    photo: string | null
    active: boolean
    document: string
    phones: [
      {
        id: number
        main: boolean
        ddd: string
        number: string
      }
    ]
    birthday: number
    address: {
      id: number
      zipcode: string
      street: string
      number: string
      neighborhood: string
      city: string
      state: string
      complementary: string | null
    }
    createdAt: number
  }
  code: string
  items: [
    {
      id: number
      total: number
      amount: number
      product: {
        id: number
        name: string
        cover: {
          id: number
          name: string
          type: string
          src: string
        }
        status: true
        amount: number | null
        price: number
        description: string
        options: {}
        createdAt: number
        expiriresIne: null
        company: {
          id: number
          name: string
        }
      }
      product_name: string
    }
  ]
  createdAt: number
}

export type OrderListItemResponse = {
  id: number
  code: string
  status: false
  users: []
  gatewayId: string
  usedOn: {
    date: string
    timezone_type: number
    timezone: string
  } | null
  createdAt: {
    date: string
    timezone_type: number
    timezone: string
  }
  items: [
    {
      id: number
      amount: number
      productName: string
      total: number
      product: {
        id: number
        name: string
      }
    }
  ]
  invoice: {
    id: number
    invoice: null
    paymentMethod: 'PIX' | 'BOLETO' | 'CREDIT_CARD'
    installments: number
    discount: null
    boleto: string
    status:
      | 'AUTHORIZED'
      | 'CANCELED'
      | 'CHARGEBACK'
      | 'EXPIRED'
      | 'IN_PROTEST'
      | 'PAID'
      | 'PARTIALLY_PAID'
      | 'PENDING'
      | 'REFUNDED'
      | 'REFUNDING'
      | 'IN_ANALYSIS'
      | 'REFUSED'
      | 'WAITING_PAYMENT'
  }
}

export type OrderListResponse = OrderListItemResponse[]
