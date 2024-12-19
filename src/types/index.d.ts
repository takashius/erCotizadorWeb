export interface Created {
  user: string
  date: string
}

export interface CreatedExtend {
  user: User
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

export interface User {
  _id: string
  name: string
  lastname: string
}

export interface Company {
  _id: string
  name: string
  email: string
  phone: string
  rif: string
  address: string
  logo: string
  logoAlpha: string
}

export interface Address {
  title: string
  city: string
  line1: string
  line2?: string
  zip: string
  default: boolean
  _id: string
}

export interface Product {
  master: string
  name: string
  description: string
  price: number
  amount: number
  iva: boolean
  _id: string
}

export interface CustomerDetail {
  _id: string
  title: string
  name: string
  lastname: string
  rif: string
  email: string
  phone: string
  addresses: Address[]
}

export interface QuotationDetail {
  created: {
    user: User
    date: string
  }
  _id: string
  title: string
  description: string
  status: string
  number: number
  sequence: number
  amount: number
  date: string
  company: Company
  customer: CustomerDetail
  rate: number
  discount: number
  typeDiscount: string
  products: Product[]
  totalIva: number
  total: number
}

export interface Client {
  created: CreatedExtend
  _id: string
  title: string
  name: string
  lastname: string
  rif: string
  email: string
  company: string
  addresses: Address[]
  active: boolean
}

export interface ClientForm {
  title: string
  name: string
  lastname: string
  rif: string
  email: string
  phone: string
  address: {
    title: string
    city: string
    line1: string
    line2?: string
    zip: string
  }
}

export interface Account {
  address?: string | undefined
  bio: string | undefined
  _id?: string
  name: string | undefined
  lastName: string | undefined
  photo?: string
  banner?: string
  phone: string | undefined
  email?: string
  date?: string
  companies?: CompanyAccount[]
  role?: Role[]
}

export interface LoginResponse {
  _id: string
  name: string
  lastName: string
  photo: string
  email: string
  date: string
  token: string
}

export interface ClientListResponse {
  results: Client[]
  totalCustomers: number
  totalPages: number
  currentPage: number
  next: string | null
}
