import { useState, useEffect } from 'react'
import { Table, Button, Input } from 'antd'
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { productData } from '../mocks/productData'

const ProductList = () => {
  // const [products, setProducts] = useState(productData.results)
  const products = productData.results
  const [searchText, setSearchText] = useState('')
  const [filteredProducts, setFilteredProducts] = useState(productData.results)

  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        `${product.name} ${product.price} ${product.iva ? 'IVA' : 'Sin IVA'}`
          .toLowerCase()
          .includes(searchText.toLowerCase())
      )
    )
  }, [searchText, products])

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'IVA',
      key: 'iva',
      render: (record: any) => (
        <span>{record.iva ? 'IVA' : 'Sin IVA'}</span>
      )
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
          placeholder="Buscar producto"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          prefix={<SearchOutlined />}
          className="w-full md:w-1/3"
        />
        <Button type="primary" icon={<PlusOutlined />}>
          Agregar Producto
        </Button>
      </div>
      <Table columns={columns} dataSource={filteredProducts} rowKey="_id" />
    </div>
  )
}

export default ProductList
