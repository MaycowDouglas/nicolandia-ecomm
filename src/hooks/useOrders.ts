import { OrderListResponse } from '@/types/order'
import useSWR from 'swr'

export default function useOrders() {
  const { data, error } = useSWR<OrderListResponse>('/api/orders')

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}
