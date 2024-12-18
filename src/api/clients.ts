import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult
} from '@tanstack/react-query'
import ERDEAxios from './ERDEAxios'
import { Client, ClientForm, ClientListResponse } from '../types'

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

const deleteClient = async (id: string) => {
  const response = await ERDEAxios.delete(`/customer/${id}`)
  return response.data
}

export const useDeleteClient = (): UseMutationResult<void, Error, string> => {
  return useMutation<void, Error, string>({
    mutationFn: deleteClient
  })
}

const fetchClientDetail = async (id: string): Promise<Client> => {
  const response = await ERDEAxios.get<Client>(`/customer/${id}`)
  return response.data
}

export const useClientDetail = (id: string): UseQueryResult<Client, Error> => {
  return useQuery<Client, Error>({
    queryKey: ['clientDetail', id],
    queryFn: () => fetchClientDetail(id),
    retry: false
  })
}
