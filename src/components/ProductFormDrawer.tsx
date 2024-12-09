import React from 'react'
import { Drawer, Form, Input, Select, Switch, Button } from 'antd'
import { useTranslation } from 'react-i18next'

const { Option } = Select;

interface ProductFormDrawerProps {
  visible: boolean
  onClose: () => void
  onSubmit: (values: any) => void
}

const ProductFormDrawer: React.FC<ProductFormDrawerProps> = ({ visible, onClose, onSubmit }) => {
  const { t } = useTranslation()
  const products = [
    { id: '1', name: 'Producto 1' },
    { id: '2', name: 'Producto 2' },
    { id: '3', name: 'Producto 3' },
    // Agrega más productos según sea necesario
  ]
  return (
    <Drawer
      title={t('productForm.addProductToQuotation')}
      width={360}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form layout="vertical" onFinish={onSubmit}>
        <Form.Item
          name="product"
          label={t('productForm.product')}
          rules={[{ required: true, message: t('productForm.product') }]}
        >
          <Select
            showSearch
            placeholder={t('productForm.product')}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
            }
          >
            {products.map(product => (
              <Option key={product.id} value={product.id}>
                {product.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="price"
          label={t('productForm.price')}
          rules={[{ required: true, message: t('productForm.price') }]}
        >
          <Input type="number" step="0.01" />
        </Form.Item>
        <Form.Item
          name="quantity"
          label={t('productForm.quantity')}
          rules={[{ required: true, message: t('productForm.quantity') }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="iva"
          label={t('productForm.tax')}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="bg-blue-500 text-white hover:bg-blue-600">
            {t('productForm.submitButtonText')}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default ProductFormDrawer
