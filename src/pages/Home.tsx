import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Table, Button, Input, Space, List, Card } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, FilePdfOutlined, SearchOutlined } from '@ant-design/icons'
import { Quotation, Customer } from '../types'
import QuotationFormModal from '../components/QuotationFormModal'
import { Link } from 'react-router-dom'

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
  const [isModalVisible, setIsModalVisible] = useState(false)

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
      render: (record: Quotation) => (
        <Space>
          <Link to={`/quotation/${record._id}`}> <Button icon={<EditOutlined />} /> </Link>
          <Button icon={<FilePdfOutlined />} />
          <Button icon={<EyeOutlined />} />
          <Button icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ]

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleOk = (values: any) => {
    console.log('Form Values:', values)
    // Aquí puedes manejar la lógica para guardar la nueva cotización
    setIsModalVisible(false)
  }


  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <Input
          placeholder={t('home.searchPlaceholder')}
          value={searchText}
          onChange={handleSearch}
          prefix={<SearchOutlined />}
          className="w-full md:w-1/2 lg:w-1/3 mb-2 md:mb-0"
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal} className="w-full md:w-auto">
          {t('home.addQuote')}
        </Button>
      </div>
      <div className="block md:hidden">
        <List
          dataSource={filteredData}
          renderItem={item => (
            <Card className="mb-2">
              <p><strong>{t('home.title')}: </strong>{item.title}</p>
              <p><strong>{t('home.client')}: </strong>{item.customer.name} {item.customer.lastname}</p>
              <p><strong>{t('home.date')}: </strong>{item.date}</p>
              <p><strong>{t('home.price')}: </strong>{item.amount}</p>
              <div className='mt-4'>
                <Link to={`/quotation/${item._id}`}> <Button icon={<EditOutlined />} /> </Link>
                <Button icon={<DeleteOutlined />} />
              </div>
            </Card>
          )}
        />
      </div>

      <div className="hidden md:block">
        <Table columns={columns} dataSource={filteredData} scroll={{ x: '100%' }} className="overflow-x-auto" />
      </div>

      <QuotationFormModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
      />
    </div>
  )
}

export default Home
