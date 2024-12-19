import { useState, useEffect } from 'react'
import { Table, Button, Input } from 'antd'
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import AddClientModal from '../components/AddClientModal'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useClients } from '../api/clients'

const ClientList = () => {
  const { t } = useTranslation()
  const [searchText, setSearchText] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading, error, refetch } = useClients(currentPage, searchText)

  useEffect(() => {
    setCurrentPage(1)
    refetch()
  }, [searchText])

  useEffect(() => {
    refetch()
  }, [currentPage])

  useEffect(() => {
    console.log('Data:', data?.results)
  }, [data])

  const columns = [
    {
      title: t('ClientList.title'),
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: t('ClientList.name'),
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: t('ClientList.rif'),
      dataIndex: 'rif',
      key: 'rif'
    },
    {
      title: t('ClientList.phone'),
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: t('actions'),
      key: 'actions',
      render: (record: { _id: any }) => (
        <span>
          <Link to={`/client/${record._id}`}> <Button icon={<EditOutlined />} /></Link>
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record)} className="ml-2" />
        </span>
      )
    }
  ]

  const handleDelete = (record: { _id: any }) => {
    console.log('Delete:', record)
  }

  const handleCreate = () => {
    setModalVisible(false)
    refetch()
  }

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current)
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder={t('ClientList.searchPlaceholder')}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          prefix={<SearchOutlined />}
          className="w-full md:w-1/3"
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
          {t('ClientList.addClient')}
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data?.results || []}
        rowKey="_id"
        loading={isLoading}
        pagination={{
          total: data?.totalCustomers || 0,
          current: currentPage,
          pageSize: 20,
          showSizeChanger: false
        }}
        onChange={handleTableChange}
      />
      <AddClientModal visible={modalVisible} onCreate={handleCreate} onCancel={() => setModalVisible(false)} />
    </div>
  )
}

export default ClientList
