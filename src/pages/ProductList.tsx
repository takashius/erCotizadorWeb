import { useState, useEffect } from 'react'
import { Table, Button, Input } from 'antd'
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { productData } from '../mocks/productData'
import AddProductModal from '../components/AddProductModal'
import { useTranslation } from 'react-i18next'

const ProductList = () => {
  const { t } = useTranslation()
  const products = productData.results
  const [searchText, setSearchText] = useState('')
  const [filteredProducts, setFilteredProducts] = useState(productData.results)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        `${product.name} ${product.price} ${product.iva ? t('ProductList.ivaYes') : t('ProductList.ivaNo')}`
          .toLowerCase()
          .includes(searchText.toLowerCase())
      )
    )
  }, [searchText, products, t])

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

  const handleCreate = (values: any) => {
    console.log('Producto creado:', values)
    setModalVisible(false)
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder={t('ProductList.searchPlaceholder')}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          prefix={<SearchOutlined />}
          className="w-full md:w-1/3"
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
          {t('ProductList.addProductButton')}
        </Button>
      </div>
      <Table columns={columns} dataSource={filteredProducts} rowKey="_id" />
      <AddProductModal
        visible={modalVisible}
        onCreate={handleCreate}
        onCancel={() => setModalVisible(false)}
      />
    </div>
  )
}

export default ProductList
