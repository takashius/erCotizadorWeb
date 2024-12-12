import {
  useQuery,
  UseQueryResult,
  useMutation,
  UseMutationResult
} from '@tanstack/react-query'
import ERDEAxios from './ERDEAxios'
import { Quotation, QuotationDetail } from '../types'

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

export const useCotizaDetail = (
  id: string
): UseQueryResult<QuotationDetail, Error> => {
  return useQuery<QuotationDetail, Error>({
    queryKey: ['cotizaDetail', id],
    retry: false,
    queryFn: async () => {
      const response = await ERDEAxios.get<QuotationDetail>(`/cotiza/${id}`)
      return response.data as QuotationDetail
    }
  })
}

const downloadPDF = async ({
  id,
  number,
  type
}: {
  id: string
  number: string
  type: string
}) => {
  try {
    localStorage.setItem('responseType', 'blob')

    const endpoint =
      type === 'factura' ? `/cotiza/pdf/${id}` : `/cotiza/pdflibre/${id}`
    const response = await ERDEAxios.get(endpoint, {
      responseType: 'blob'
    })

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `cotiza_${number}_${type}.pdf`)
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
  { id: string; number: string; type: string },
  unknown
> => {
  return useMutation<
    void,
    Error,
    { id: string; number: string; type: string },
    unknown
  >({
    mutationFn: downloadPDF
  })
}
