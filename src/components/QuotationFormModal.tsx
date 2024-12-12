import React from 'react'
import { Modal, Form, Input, DatePicker, Select } from 'antd'
import { useTranslation } from 'react-i18next'
import { useCreateQuotation } from '../api/cotiza'
import { useCustomers } from '../api/clients'
import { useNavigate } from 'react-router-dom'

interface QuotationFormModalProps {
  visible: boolean
  onCancel: () => void
  onOk: (values: any) => void
}

const QuotationFormModal: React.FC<QuotationFormModalProps> = ({ visible, onCancel, onOk }) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const createQuotationMutation = useCreateQuotation()
  const { data: customers, isLoading } = useCustomers()

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        createQuotationMutation.mutate(values, {
          onSuccess: (data) => {
            onOk(data)
            form.resetFields()
            navigate(`/quotation/${data._id}`)
          }
        })
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
  }

  return (
    <Modal
      title={t('quotationFormModal.title')}
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={createQuotationMutation.isPending}
    >
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
            loading={isLoading}
            optionFilterProp="children"
            filterOption={(input, option) => {
              const optionText = option?.children ? `${option.children}` : ''
              return (optionText.toLowerCase().includes(input.toLowerCase()))
            }
            }
          >
            {customers?.map(customer => (
              <Select.Option key={customer.id} value={customer.id}>
                {customer.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default QuotationFormModal
