import React, { useState } from 'react'
import { Card, Form, Input, Button, Upload, Tooltip, Row, Col } from 'antd'
import { UploadOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { ChromePicker } from 'react-color'
import { useTranslation } from 'react-i18next'

const EmailSettings: React.FC = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [banner, setBanner] = useState<string | null>(null)
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff')
  const [primaryColor, setPrimaryColor] = useState<string>('#000000')
  const [secondaryColor, setSecondaryColor] = useState<string>('#000000')
  const [titleColor, setTitleColor] = useState<string>('#000000')

  const handleSave = (values: any) => {
    console.log('Configuración guardada:', values)
    // Aquí puedes manejar la lógica para guardar los datos
  }

  const handleBannerChange = (info: any) => {
    if (info.file.status === 'done') {
      setBanner(URL.createObjectURL(info.file.originFileObj))
    }
  }

  return (
    <div className="p-4">
      <Form
        form={form}
        layout="vertical"
        name="email_settings"
        onFinish={handleSave}
      >
        <Card title={t('EmailSettings.bannerTitle')} bordered={false} className="mb-4">
          <Form.Item
            name="banner"
            label={t('EmailSettings.banner')}
          >
            <Upload
              name="banner"
              listType="picture"
              className="upload-list-inline"
              showUploadList={false}
              onChange={handleBannerChange}
            >
              <Button icon={<UploadOutlined />}>{t('EmailSettings.uploadButton')}</Button>
            </Upload>
            {banner && <img src={banner} alt="banner" style={{ marginTop: '10px', maxWidth: '200px' }} />}
          </Form.Item>
        </Card>

        <Card title={t('EmailSettings.colorSettingsTitle')} bordered={false} className="mb-4">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="backgroundColor"
                label={t('EmailSettings.backgroundColor')}
              >
                <ChromePicker
                  color={backgroundColor}
                  onChangeComplete={(color) => setBackgroundColor(color.hex)}
                />
              </Form.Item>
              <Form.Item
                name="primaryColor"
                label={t('EmailSettings.primaryColor')}
              >
                <ChromePicker
                  color={primaryColor}
                  onChangeComplete={(color) => setPrimaryColor(color.hex)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="secondaryColor"
                label={t('EmailSettings.secondaryColor')}
              >
                <ChromePicker
                  color={secondaryColor}
                  onChangeComplete={(color) => setSecondaryColor(color.hex)}
                />
              </Form.Item>
              <Form.Item
                name="titleColor"
                label={t('EmailSettings.titleColor')}
              >
                <ChromePicker
                  color={titleColor}
                  onChangeComplete={(color) => setTitleColor(color.hex)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title={t('EmailSettings.messageBodyTitle')} bordered={false}>
          <Form.Item
            name="messageBody"
            label={
              <span>
                {t('EmailSettings.messageBody')}
                <Tooltip title={t('EmailSettings.tooltip')}>
                  <InfoCircleOutlined style={{ marginLeft: '8px' }} />
                </Tooltip>
              </span>
            }
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Card>

        <Form.Item style={{ textAlign: 'right', marginTop: '16px' }}>
          <Button type="primary" htmlType="submit">
            {t('EmailSettings.saveButton')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default EmailSettings
