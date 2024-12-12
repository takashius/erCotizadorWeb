import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { PopconfirmProps } from 'antd'
import { Table, Button, Input, Space, List, Card, message, Popconfirm } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, FilePdfOutlined, SearchOutlined } from '@ant-design/icons'
import { Quotation, Customer } from '../types'
import QuotationFormModal from '../components/QuotationFormModal'
import { Link } from 'react-router-dom'
import { useCotizaList, useDownloadPDF } from '../api/cotiza'

const Home: React.FC = () => {
  const { t } = useTranslation()
  const [searchText, setSearchText] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const { data = [], error, isLoading } = useCotizaList()
  const downloadMutation = useDownloadPDF()

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    console.log(e)
    message.success('Click on Yes')
  }

  const cancel: PopconfirmProps['onCancel'] = (e) => {
    console.log(e)
    message.error('Click on No')
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase()) ||
    item.customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.customer?.lastname?.toLowerCase().includes(searchText.toLowerCase())
  )

  const handleDownloadPDF = (id: string, number: string) => {
    setLoadingId(id)
    downloadMutation.mutate({ id, number }, {
      onSettled: () => {
        setLoadingId(null)
      }
    })
  }

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
      title: t('actions'),
      key: 'actions',
      width: 150,
      render: (record: Quotation) => (
        <Space>
          <Link to={`/quotation/${record._id}`}> <Button icon={<EditOutlined />} /> </Link>
          <Button
            icon={<FilePdfOutlined />}
            onClick={() => handleDownloadPDF(record._id, record.number.toString())}
            loading={loadingId === record._id}
          />
          <Button icon={<EyeOutlined />} />
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
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
    setIsModalVisible(false)
  }

  if (error) {
    return <div>Error: {error.message}</div>
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
        <Table columns={columns} loading={isLoading} dataSource={filteredData} scroll={{ x: '100%' }} className="overflow-x-auto" />
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
