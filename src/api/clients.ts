import { useQuery, UseQueryResult } from '@tanstack/react-query'
import ERDEAxios from './ERDEAxios'

interface Customer {
  id: string
  title: string
}

const fetchCustomers = async (): Promise<Customer[]> => {
  const response = await ERDEAxios.get<Customer[]>('/customer/simple')
  return response.data
}

export const useCustomers = (): UseQueryResult<Customer[], Error> => {
  return useQuery<Customer[], Error>({
    queryKey: ['customerSimple'],
    queryFn: fetchCustomers,
    retry: false
  })
}
