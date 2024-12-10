import React from 'react'
import { Modal, Form, Input, Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'

interface AddClientModalProps {
  visible: boolean
  onCreate: (values: any) => void
  onCancel: () => void
}

const AddClientModal: React.FC<AddClientModalProps> = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm()
  const { t } = useTranslation()

  return (
    <Modal
      visible={visible}
      title={t('AddClientModal.addClient')}
      okText={t('AddClientModal.create')}
      cancelText={t('AddClientModal.cancel')}
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
      width={800} // Aumenta el ancho del modal
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label={t('AddClientModal.title')}
              rules={[{ required: true, message: t('AddClientModal.validationTitle') }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label={t('AddClientModal.email')}
              rules={[{ required: true, message: t('AddClientModal.validationEmail') }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label={t('AddClientModal.name')}
              rules={[{ required: true, message: t('AddClientModal.validationName') }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastname"
              label={t('AddClientModal.lastname')}
              rules={[{ required: true, message: t('AddClientModal.validationLastname') }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="rif"
              label={t('AddClientModal.rif')}
              rules={[{ required: true, message: t('AddClientModal.validationRif') }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              label={t('AddClientModal.phone')}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="address1"
              label={t('AddClientModal.address1')}
              rules={[{ required: true, message: t('AddClientModal.validationAddress1') }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="address2"
              label={t('AddClientModal.address2')}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="city"
              label={t('AddClientModal.city')}
              rules={[{ required: true, message: t('AddClientModal.validationCity') }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="postalCode"
              label={t('AddClientModal.postalCode')}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default AddClientModal
