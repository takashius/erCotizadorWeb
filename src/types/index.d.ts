export interface Created {
  user: string
  date: string
}

export interface Customer {
  _id: string
  name: string
  lastname: string
}

export interface Quotation {
  created: Created
  _id: string
  title: string
  description: string
  status: string
  number: number
  sequence: number
  amount: number
  date: string
  company: string
  customer: Customer
  rate: number
  discount: number
  typeDiscount: string
}
