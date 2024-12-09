import React from 'react'
import { Modal, Form, Input, DatePicker, Select } from 'antd'
import { useTranslation } from 'react-i18next'
import { Customer } from '../types'

interface QuotationFormModalProps {
  visible: boolean
  onCancel: () => void
  onOk: (values: any) => void
}

const QuotationFormModal: React.FC<QuotationFormModalProps> = ({ visible, onCancel, onOk }) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const customers: Customer[] = [
    {
      _id: '65f46291a14af3a4a4d7be84',
      name: 'PRODUCCIONES AURIGA',
      lastname: 'C.A.'
    },
    {
      _id: '65f46291a14af3a4a4d7be85',
      name: 'Cliente 2',
      lastname: 'S.A.'
    },
    // Agrega más clientes según sea necesario
  ]

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
    <Modal title={t('quotationFormModal.title')} visible={visible} onOk={handleOk} onCancel={onCancel}>
      <Form layout="vertical" form={form}>
        <Form.Item
          label={t('quotationFormModal.titleLabel')}
          name="title"
          rules={[{ required: true, message: t('quotationFormModal.titleRequired') }]}
        >
          <Input placeholder={t('quotationFormModal.titlePlaceholder')} />
        </Form.Item>
        <Form.Item
          label={t('quotationFormModal.descriptionLabel')}
          name="description"
        >
          <Input.TextArea placeholder={t('quotationFormModal.descriptionPlaceholder')} />
        </Form.Item>
        <Form.Item
          label={t('quotationFormModal.numberLabel')}
          name="number"
        >
          <Input type="number" placeholder={t('quotationFormModal.numberPlaceholder')} />
        </Form.Item>
        <Form.Item
          label={t('quotationFormModal.dateLabel')}
          name="date"
          rules={[{ required: true, message: t('quotationFormModal.dateRequired') }]}
          style={{ width: '100%' }}
        >
          <DatePicker style={{ width: '100%' }} placeholder={t('quotationFormModal.datePlaceholder')} />
        </Form.Item>
        <Form.Item
          label={t('quotationFormModal.customerLabel')}
          name="customer"
          rules={[{ required: true, message: t('quotationFormModal.customerRequired') }]}
        >
          <Select
            showSearch
            placeholder={t('quotationFormModal.customerPlaceholder')}
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
