import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult
} from '@tanstack/react-query'
import ERDEAxios from './ERDEAxios'
import { ClientForm, ClientListResponse } from '../types'

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

const fetchClients = async (
  page: number,
  search: string
): Promise<ClientListResponse> => {
  const response = await ERDEAxios.get<ClientListResponse>(
    `/customer/list/${page}/${search}`
  )
  return response.data
}

export const useClients = (
  page: number,
  search: string
): UseQueryResult<ClientListResponse, Error> => {
  return useQuery<ClientListResponse, Error>({
    queryKey: ['clientList', page, search],
    queryFn: () => fetchClients(page, search),
    retry: false
  })
}

const createClient = async (clientData: ClientForm): Promise<void> => {
  await ERDEAxios.post('/customer', clientData)
}

export const useCreateClient = (): UseMutationResult<
  void,
  Error,
  ClientForm
> => {
  return useMutation<void, Error, ClientForm>({
    mutationFn: createClient,
    retry: false
  })
}
