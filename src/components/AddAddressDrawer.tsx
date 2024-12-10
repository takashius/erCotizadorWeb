import React from 'react'
import { Drawer, Button, Form, Input, Switch } from 'antd'
import { useTranslation } from 'react-i18next'

interface AddAddressDrawerProps {
  visible: boolean
  onClose: () => void
  onCreate: (values: any) => void
}

const AddAddressDrawer: React.FC<AddAddressDrawerProps> = ({ visible, onClose, onCreate }) => {
  const [form] = Form.useForm()
  const { t } = useTranslation()

  return (
    <Drawer
      title={t('AddAddressDrawer.title')}
      width={360}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: 'right'
          }}
        >
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            {t('AddAddressDrawer.cancel')}
          </Button>
          <Button
            onClick={() => {
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
            type="primary"
          >
            {t('submit')}
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_drawer"
        initialValues={{ default: false }}
      >
        <Form.Item
          name="title"
          label={t('AddAddressDrawer.title')}
          rules={[{ required: true, message: t('AddAddressDrawer.validationTitle') }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="city"
          label={t('AddAddressDrawer.city')}
          rules={[{ required: true, message: t('AddAddressDrawer.validationCity') }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="line1"
          label={t('AddAddressDrawer.address1')}
          rules={[{ required: true, message: t('AddAddressDrawer.validationAddress1') }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="line2"
          label={t('AddAddressDrawer.address2')}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="postalCode"
          label={t('AddAddressDrawer.postalCode')}
          rules={[{ required: true, message: t('AddAddressDrawer.validationPostalCode') }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="default"
          label={t('AddAddressDrawer.default')}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default AddAddressDrawer