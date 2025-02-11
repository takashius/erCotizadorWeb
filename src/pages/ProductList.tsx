import { useState, useEffect } from 'react'
import { Table, Button, Input, Popconfirm, message } from 'antd'
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import AddProductModal from '../components/AddProductModal'
import { useTranslation } from 'react-i18next'
import { useDeleteProduct, useProductList } from '../api/products'

const ProductList = () => {
  const { t } = useTranslation()
  const [searchText, setSearchText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [modalVisible, setModalVisible] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const [initialValues, setInitialValues] = useState<any>(null)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const { data, isLoading, error, refetch } = useProductList(currentPage, searchText)
  const deleteProductMutation = useDeleteProduct()

  useEffect(() => {
    setCurrentPage(1)
    refetch()
  }, [searchText])

  useEffect(() => {
    refetch()
  }, [currentPage])

  const columns = [
    {
      title: t('ProductList.name'),
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: t('ProductList.price'),
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: t('ProductList.iva'),
      key: 'iva',
      render: (record: any) => (
        <span>{record.iva ? t('ProductList.ivaYes') : t('ProductList.ivaNo')}</span>
      )
    },
    {
      title: t('ProductList.actions'),
      key: 'actions',
      render: (record: any) => (
        <span>
          <Button icon={<EditOutlined />} type='primary' onClick={() => handleEdit(record)} />
          <Popconfirm
            title={t('quotationDetails.deleteConfirmTitle')}
            description={t('quotationDetails.deleteConfirmDescription')}
            onConfirm={() => handleDelete(record._id)}
            okText={t('home.confirmOkText')}
            cancelText={t('home.confirmCancelText')}
          >
            <Button
              icon={<DeleteOutlined />} className="ml-2"
              type='primary'
              loading={loadingId === record._id && deleteProductMutation.isPending}
            />
          </Popconfirm>
        </span>
      )
    }
  ]

  const handleEdit = (record: any) => {
    setIsEdit(true)
    setInitialValues(record)
    setModalVisible(true)
  }

  const handleDelete = (productId: string) => {
    setLoadingId(productId)
    deleteProductMutation.mutate(productId, {
      onSuccess: () => {
        messageApi.open({
          type: 'success',
          content: `Eliminado correctamente`,
        })
        refetch()
      },
      onSettled: () => {
        setLoadingId(null)
      }
    })
  }

  const handleCreate = () => {
    messageApi.open({
      type: 'success',
      content: `Producto creado correctamente`,
    })
    setModalVisible(false)
    refetch()
  }

  const handleEditSuccess = () => {
    messageApi.open({
      type: 'success',
      content: `Producto actualizado correctamente`,
    })
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
      {contextHolder}
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder={t('ProductList.searchPlaceholder')}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          prefix={<SearchOutlined />}
          className="w-full md:w-1/3"
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => {
          setModalVisible(true);
          setIsEdit(false);
          setInitialValues(null)
        }}>
          {t('ProductList.addProductButton')}
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data?.results || []}
        rowKey="_id"
        loading={isLoading}
        pagination={{
          total: data?.totalProducts || 0,
          current: currentPage,
          pageSize: 20,
          showSizeChanger: false
        }}
        onChange={handleTableChange}
      />
      <AddProductModal
        visible={modalVisible}
        onCreate={handleCreate}
        onEdit={handleEditSuccess}
        onCancel={() => setModalVisible(false)}
        isEdit={isEdit}
        initialValues={initialValues}
      />
    </div>
  )
}

export default ProductList
