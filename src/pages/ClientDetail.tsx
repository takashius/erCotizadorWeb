import React, { useState } from 'react'
import { Card, Table, Button, Descriptions } from 'antd'
import { mockClient } from '../mocks/mockClient'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import AddClientModal from '../components/AddClientModal'
import AddAddressDrawer from '../components/AddAddressDrawer'

const ClientDetail: React.FC = () => {
  const { t } = useTranslation()
  const client = mockClient
  const [modalVisible, setModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [addressDrawerVisible, setAddressDrawerVisible] = useState(false)
  const [editingClient, setEditingClient] = useState<any>(null)

  const columns = [
    {
      title: t('ClientDetail.addressTitle'),
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: t('ClientDetail.city'),
      dataIndex: 'city',
      key: 'city'
    },
    {
      title: t('ClientDetail.line1'),
      dataIndex: 'line1',
      key: 'line1'
    },
    {
      title: t('ClientDetail.zip'),
      dataIndex: 'zip',
      key: 'zip'
    },
    {
      title: t('ClientDetail.default'),
      dataIndex: 'default',
      key: 'default',
      render: (defaultAddr: boolean) => (defaultAddr ? t('ClientDetail.yes') : t('ClientDetail.no'))
    },
    {
      title: t('ClientDetail.actions'),
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
    setEditingClient(record)
    setEditModalVisible(true)
  }

  const handleDelete = (record: any) => {
    console.log('Delete:', record)
  }

  const handleCreate = (values: any) => {
    console.log('Cliente creado:', values)
    setModalVisible(false)
  }

  const handleUpdate = (values: any) => {
    console.log('Cliente actualizado:', values)
    setEditModalVisible(false)
  }

  const showDrawer = () => {
    setAddressDrawerVisible(true)
  }

  const handleDrawerClose = () => {
    setAddressDrawerVisible(false)
  }

  const handleAddressCreate = (values: any) => {
    console.log('Dirección agregada:', values)
    setAddressDrawerVisible(false)
  }

  return (
    <div className="p-4">
      <Card title={`${client.title} - ${client.name} ${client.lastname}`} bordered={false}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label={t('ClientDetail.name')}>{client.name} {client.lastname}</Descriptions.Item>
          <Descriptions.Item label={t('ClientDetail.email')}>{client.email}</Descriptions.Item>
          <Descriptions.Item label={t('ClientDetail.rif')}>{client.rif}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card
        title={
          <div className="flex justify-between items-center">
            <span>{t('ClientDetail.addressesTitle')}</span>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showDrawer}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              {t('ClientDetail.addAddressButton')}
            </Button>
          </div>
        }
        bordered={false}
        className="mt-4"
      >
        <Table columns={columns} dataSource={client.addresses} rowKey="_id" scroll={{ x: '100%' }} className="overflow-x-auto" />
      </Card>
      <AddClientModal
        visible={modalVisible}
        onCreate={handleCreate}
        onCancel={() => setModalVisible(false)}
        isEdit={false}
      />
      <AddClientModal
        visible={editModalVisible}
        onCreate={handleUpdate}
        onCancel={() => setEditModalVisible(false)}
        isEdit={true}
        initialValues={editingClient}
      />
      <AddAddressDrawer
        visible={addressDrawerVisible}
        onClose={handleDrawerClose}
        onCreate={handleAddressCreate}
      />
    </div>
  )
}

export default ClientDetail
