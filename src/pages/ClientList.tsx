import { useState, useEffect } from 'react'
import { Table, Button, Input } from 'antd'
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { clientData } from '../mocks/clientData'

const ClientList = () => {
  // const [clients, setClients] = useState(clientData.results)
  const clients = clientData.results
  const [searchText, setSearchText] = useState('')
  const [filteredClients, setFilteredClients] = useState(clientData.results)

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
      title: 'Título',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'RIF',
      dataIndex: 'rif',
      key: 'rif'
    },
    {
      title: 'Teléfono',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (record: any) => (
        <span>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record)} className="ml-2" />
        </span>
      )
    }
  ]

  const handleEdit = (record: any) => {
    console.log('Edit:', record)
  }

  const handleDelete = (record: any) => {
    console.log('Delete:', record)
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Buscar cliente"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          prefix={<SearchOutlined />}
          className="w-full md:w-1/3"
        />
        <Button type="primary" icon={<PlusOutlined />}>
          Agregar Cliente
        </Button>
      </div>
      <Table columns={columns} dataSource={filteredClients} rowKey="_id" />
    </div>
  )
}

export default ClientList
