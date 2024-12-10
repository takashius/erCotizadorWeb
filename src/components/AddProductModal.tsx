import React from 'react'
import { Modal, Form, Input, Switch } from 'antd'
import { useTranslation } from 'react-i18next'

interface AddProductModalProps {
  visible: boolean
  onCreate: (values: any) => void
  onCancel: () => void
}

const AddProductModal: React.FC<AddProductModalProps> = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm()
  const { t } = useTranslation()

  return (
    <Modal
      visible={visible}
      title={t('AddProductModal.addProduct')}
      okText={t('AddProductModal.create')}
      cancelText={t('AddProductModal.cancel')}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields()
            onCreate(values)
          })
          .catch(info => {
            console.log('Validation failed:', info)
          })
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item
          name="name"
          label={t('AddProductModal.name')}
          rules={[{ required: true, message: t('AddProductModal.validationName') }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label={t('AddProductModal.description')}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label={t('AddProductModal.price')}
          rules={[{ required: true, message: t('AddProductModal.validationPrice') }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="iva"
          label={t('AddProductModal.iva')}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddProductModal
