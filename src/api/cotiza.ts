import {
  useQuery,
  UseQueryResult,
  useMutation,
  UseMutationResult
} from '@tanstack/react-query'
import ERDEAxios from './ERDEAxios'
import { Quotation } from '../types'

export const useCotizaList = (): UseQueryResult<Quotation[], Error> => {
  return useQuery<Quotation[], Error>({
    queryKey: ['cotizaList'],
    retry: false,
    queryFn: async () => {
      const response = await ERDEAxios.get<Quotation[]>('/cotiza')
      return response.data as Quotation[]
    }
  })
}

const downloadPDF = async ({ id, number }: { id: string; number: string }) => {
  try {
    localStorage.setItem('responseType', 'blob')

    const response = await ERDEAxios.get(`/cotiza/pdf/${id}`, {
      responseType: 'blob'
    })

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `cotiza_${number}.pdf`)
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (error) {
    console.error('Error descargando el PDF:', error)
  } finally {
    localStorage.removeItem('responseType')
  }
}

export const useDownloadPDF = (): UseMutationResult<
  void,
  Error,
  { id: string; number: string },
  unknown
> => {
  return useMutation<void, Error, { id: string; number: string }, unknown>({
    mutationFn: downloadPDF
  })
}
