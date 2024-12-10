import React, { useState } from 'react'
import { Card, Form, InputNumber, Button, Upload, Row, Col } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

const PDFSettings: React.FC = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [watermark, setWatermark] = useState<string | null>(null)

  const handleSave = (values: any) => {
    console.log('Configuración guardada:', values)
    // Aquí puedes manejar la lógica para guardar los datos
  }

  const handleWatermarkChange = (info: any) => {
    if (info.file.status === 'done') {
      setWatermark(URL.createObjectURL(info.file.originFileObj))
    }
  }

  return (
    <div className="p-4">
      <Form
        form={form}
        layout="vertical"
        name="pdf_settings"
        onFinish={handleSave}
      >
        <Card title={t('PDFSettings.logoTitle')} bordered={false} className="mb-4">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="logoWidth"
                label={t('PDFSettings.width')}
                rules={[{ required: true, message: t('PDFSettings.validationWidth') }]}
              >
                <InputNumber min={0} max={1000} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="logoXPosition"
                label={t('PDFSettings.xPosition')}
                rules={[{ required: true, message: t('PDFSettings.validationXPosition') }]}
              >
                <InputNumber min={0} max={1000} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="logoYPosition"
                label={t('PDFSettings.yPosition')}
                rules={[{ required: true, message: t('PDFSettings.validationYPosition') }]}
              >
                <InputNumber min={0} max={1000} />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title={t('PDFSettings.watermarkTitle')} bordered={false}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="watermarkWidth"
                label={t('PDFSettings.width')}
                rules={[{ required: true, message: t('PDFSettings.validationWidth') }]}
              >
                <InputNumber min={0} max={1000} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="watermarkXPosition"
                label={t('PDFSettings.xPosition')}
                rules={[{ required: true, message: t('PDFSettings.validationXPosition') }]}
              >
                <InputNumber min={0} max={1000} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="watermarkYPosition"
                label={t('PDFSettings.yPosition')}
                rules={[{ required: true, message: t('PDFSettings.validationYPosition') }]}
              >
                <InputNumber min={0} max={1000} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="watermarkLogo"
            label={t('PDFSettings.logo')}
          >
            <Upload
              name="logo"
              listType="picture"
              className="upload-list-inline"
              showUploadList={false}
              onChange={handleWatermarkChange}
            >
              <Button icon={<UploadOutlined />}>{t('PDFSettings.uploadButton')}</Button>
            </Upload>
            {watermark && <img src={watermark} alt="watermark" style={{ marginTop: '10px', maxWidth: '200px' }} />}
          </Form.Item>
        </Card>

        <Form.Item style={{ textAlign: 'right', marginTop: '10px' }}>
          <Button type="primary" htmlType="submit">
            {t('PDFSettings.saveButton')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default PDFSettings
