import React, { useState } from 'react'
import { Card, Form, Input, InputNumber, Button, Select, Switch, Upload, Row, Col } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

const { Option } = Select

const GeneralSettings: React.FC = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [logo, setLogo] = useState<string | null>(null)

  const handleSave = (values: any) => {
    setLoading(true)
    console.log('Configuración guardada:', values)
    // Simula una llamada API
    setTimeout(() => {
      setLoading(false)
      form.resetFields()
    }, 2000)
  }

  const handleLogoChange = (info: any) => {
    if (info.file.status === 'done') {
      // Obtener la URL del logo subido
      setLogo(URL.createObjectURL(info.file.originFileObj))
    }
  }

  return (
    <div className="p-4">
      <Card title={t('GeneralSettings.title')} bordered={false}>
        <Form
          form={form}
          layout="vertical"
          name="general_settings_form"
          onFinish={handleSave}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="address"
                label={t('GeneralSettings.address')}
                rules={[{ required: true, message: t('GeneralSettings.validationAddress') }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label={t('GeneralSettings.description')}
                rules={[{ required: true, message: t('GeneralSettings.validationDescription') }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phone"
                label={t('GeneralSettings.phone')}
                rules={[{ required: true, message: t('GeneralSettings.validationPhone') }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="rif"
                label={t('GeneralSettings.rif')}
                rules={[{ required: true, message: t('GeneralSettings.validationRif') }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="currency"
                label={t('GeneralSettings.currency')}
                rules={[{ required: true, message: t('GeneralSettings.validationCurrency') }]}
              >
                <Select>
                  <Option value="bs">Bs</Option>
                  <Option value="euro">€</Option>
                  <Option value="usd">$</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="rate"
                label={t('GeneralSettings.rate')}
                rules={[{ required: true, message: t('GeneralSettings.validationRate') }]}
              >
                <Select placeholder={t('GeneralSettings.ratePlaceholder')}>
                  <Option value="usd">$</Option>
                  <Option value="euro">€</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="autoCorrelatives"
                label={t('GeneralSettings.autoCorrelatives')}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Form.Item
                name="iva"
                label={t('GeneralSettings.iva')}
                rules={[{ required: true, message: t('GeneralSettings.validationIva') }]}
              >
                <InputNumber
                  min={0}
                  max={100}
                  formatter={value => `${value}%`}
                  parser={value => (value ? Number(value.replace('%', '')) : 0)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="logo"
                label={t('GeneralSettings.logo')}
              >
                <Upload
                  name="logo"
                  listType="picture"
                  className="upload-list-inline"
                  showUploadList={false}
                  onChange={handleLogoChange}
                >
                  <Button icon={<UploadOutlined />}>{t('GeneralSettings.uploadButton')}</Button>
                </Upload>
                {logo && <img src={logo} alt="logo" style={{ marginTop: '10px', maxWidth: '200px' }} />}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} style={{ marginTop: '32px' }}>
                  {t('GeneralSettings.saveButton')}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  )
}

export default GeneralSettings
