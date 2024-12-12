import { useQuery, UseQueryResult } from '@tanstack/react-query'
import ERDEAxios from './ERDEAxios'

interface Product {
  id: string
  name: string
  price: number
  iva: boolean
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await ERDEAxios.get<Product[]>('/product/simple')
  return response.data
}

export const useProducts = (): UseQueryResult<Product[], Error> => {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
    retry: false
  })
}
