import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Table, Button, Input, Space } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, FilePdfOutlined } from '@ant-design/icons'
import { Customer, Quotation } from '../types'

const data: Quotation[] = [
  {
    created: {
      user: '64fbe61071af3ad203dba8b8',
      date: '2024-12-06T21:47:26.209Z'
    },
    _id: '675370eef524f5bd2211b0bf',
    title: 'Auriga Estancia',
    description: '',
    status: 'open',
    number: 194,
    sequence: 84,
    amount: 290,
    date: '6/12/2024',
    company: '65e8688766bf56f2228cbe87',
    customer: {
      _id: '65f46291a14af3a4a4d7be84',
      name: 'PRODUCCIONES AURIGA',
      lastname: 'C.A.'
    },
    rate: 48.79,
    discount: 0,
    typeDiscount: 'percentage'
  },
  // Agrega más cotizaciones según sea necesario
]

const Home: React.FC = () => {
  const { t } = useTranslation()
  const [searchText, setSearchText] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase()) ||
    item.customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.customer.lastname.toLowerCase().includes(searchText.toLowerCase())
  )

  const columns = [
    {
      title: t('home.title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('home.client'),
      dataIndex: 'customer',
      key: 'customer',
      render: (customer: Customer) => `${customer.name} ${customer.lastname}`
    },
    {
      title: t('home.date'),
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: t('home.price'),
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toLocaleString()}`,
    },
    {
      title: t('home.actions'),
      key: 'actions',
      width: 150,
      render: (_: any) => (
        <Space>
          <Button icon={<EditOutlined />} />
          <Button icon={<FilePdfOutlined />} />
          <Button icon={<EyeOutlined />} />
          <Button icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ]

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder={t('home.searchPlaceholder')}
          value={searchText}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
        <Button type="primary" icon={<PlusOutlined />}>
          {t('home.addQuote')}
        </Button>
      </div>
      <Table columns={columns} dataSource={filteredData} />
    </div>
  )
}

export default Home
