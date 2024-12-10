import React, { useState } from 'react'
import { Card, Radio, Button, List } from 'antd'
import { useTranslation } from 'react-i18next'
import './CompanySelection.css'

const CompanySelection: React.FC = () => {
  const { t } = useTranslation()
  const [selectedCompany, setSelectedCompany] = useState<string>('')

  const companies = [
    { id: '1', name: 'La Guachafa' },
    { id: '2', name: 'ErDesarrollo' },
    { id: '3', name: 'La Sazon de Axl' }
  ]

  const handleChange = (e: any) => {
    setSelectedCompany(e.target.value)
  }

  const handleSave = () => {
    console.log('Empresa seleccionada:', selectedCompany)
  }

  return (
    <div className="p-4">
      <Card title={t('CompanySelection.title')} bordered={false}>
        <Radio.Group onChange={handleChange} value={selectedCompany}>
          <List
            itemLayout="horizontal"
            dataSource={companies}
            renderItem={item => (
              <List.Item>
                <Radio value={item.id} className="custom-radio">
                  {item.name}
                </Radio>
              </List.Item>
            )}
          />
        </Radio.Group>
        <div style={{ textAlign: 'right', marginTop: '16px' }}>
          <Button type="primary" onClick={handleSave}>
            {t('CompanySelection.saveButton')}
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default CompanySelection
