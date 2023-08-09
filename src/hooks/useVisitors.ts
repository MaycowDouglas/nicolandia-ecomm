import useSWR from 'swr'

type Item = {
  _count: { order_id: number }
  _sum: { amount: number; total: number }
  product_name: string
}

type Response = {
  currentYear: {
    totalSold: string
    totalTicketsSold: number
    totalTicketsValidated: number
  }
  lastYear: {
    totalSold: string
    totalTicketsSold: number
    totalTicketsValidated: number
  }
  daySales: {
    dayPaidSales: Item[]
    dayUsedSales: Item[]
  }
}

export default function useVisitors(month: number, day: number) {
  const { data, error } = useSWR<Response>(`/api/sales/${month}/${day}`)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}
