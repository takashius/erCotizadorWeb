import React from 'react'
import { Modal, Form, Input, DatePicker, Select } from 'antd'
import { Customer } from '../types'

interface QuotationFormModalProps {
  visible: boolean
  onCancel: () => void
  onOk: (values: unknown) => void
  customers: Customer[]
}

const QuotationFormModal: React.FC<QuotationFormModalProps> = ({ visible, onCancel, onOk, customers }) => {
  const [form] = Form.useForm()

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        onOk(values)
        form.resetFields()
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
  }

  return (
    <Modal title="Crear Cotización" visible={visible} onOk={handleOk} onCancel={onCancel}>
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Título"
          name="title"
          rules={[{ required: true, message: 'Por favor ingrese el título' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Descripción"
          name="description"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Número"
          name="number"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Fecha"
          name="date"
          rules={[{ required: true, message: 'Por favor seleccione la fecha' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Cliente"
          name="customer"
          rules={[{ required: true, message: 'Por favor seleccione el cliente' }]}
        >
          <Select
            showSearch
            placeholder="Seleccionar Cliente"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children?.join('') as unknown as string).toLowerCase().includes(input.toLowerCase())
            }
          >
            {customers.map(customer => (
              <Select.Option key={customer._id} value={customer._id}>
                {customer.name} {customer.lastname}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default QuotationFormModal
