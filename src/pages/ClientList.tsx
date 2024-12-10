import { useState, useEffect } from 'react'
import { Table, Button, Input } from 'antd'
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { clientData } from '../mocks/clientData'
import AddClientModal from '../components/AddClientModal'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const ClientList = () => {
  const { t } = useTranslation()
  const clients = clientData.results
  const [searchText, setSearchText] = useState('')
  const [filteredClients, setFilteredClients] = useState(clientData.results)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    setFilteredClients(
      clients.filter(client =>
        `${client.title} ${client.name} ${client.lastname} ${client.rif}`
          .toLowerCase()
          .includes(searchText.toLowerCase())
      )
    )
  }, [searchText, clients])

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
      render: (record: any) => (
        <span>
          <Link to={`/client/${record._id}`}> <Button icon={<EditOutlined />} /></Link>
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record)} className="ml-2" />
        </span>
      )
    }
  ]

  const handleDelete = (record: any) => {
    console.log('Delete:', record)
  }

  const handleCreate = (values: any) => {
    console.log('Cliente creado:', values)
    setModalVisible(false)
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
      <Table columns={columns} dataSource={filteredClients} rowKey="_id" />
      <AddClientModal visible={modalVisible} onCreate={handleCreate} onCancel={() => setModalVisible(false)} />
    </div>
  )
}

export default ClientList
