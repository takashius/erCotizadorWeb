import React, { useState } from 'react'
import { Menu, Dropdown, Button } from 'antd'
import { EditOutlined, FilePdfOutlined, MailOutlined, DollarOutlined, MenuOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

interface FloatingMenuProps {
  onMenuClick: (key: string) => void
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({ onMenuClick }) => {
  const [menuVisible, setMenuVisible] = useState(false)
  const { t } = useTranslation()

  const handleMenuClick = ({ key }: { key: string }) => {
    setMenuVisible(false)
    onMenuClick(key)
  }

  const menu = (
    <Menu onClick={handleMenuClick} className="bg-blue-500 text-white">
      <Menu.Item key="edit" icon={<EditOutlined />} className="hover:bg-blue-600">
        {t('floatingMenu.edit')}
      </Menu.Item>
      <Menu.Item key="generate-pdf" icon={<FilePdfOutlined />} className="hover:bg-blue-600">
        {t('floatingMenu.generatePdf')}
      </Menu.Item>
      <Menu.Item key="pdf-forma-libre" icon={<FilePdfOutlined />} className="hover:bg-blue-600">
        {t('floatingMenu.pdfFormat')}
      </Menu.Item>
      <Menu.Item key="update-rate" icon={<DollarOutlined />} className="hover:bg-blue-600">
        {t('floatingMenu.updateRate')}
      </Menu.Item>
      <Menu.Item key="send-email" icon={<MailOutlined />} className="hover:bg-blue-600">
        {t('floatingMenu.sendEmail')}
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button
        type="primary"
        shape="circle"
        icon={<MenuOutlined />}
        size="large"
        onClick={() => setMenuVisible(!menuVisible)}
        className="fixed top-20 right-5 bg-blue-500 text-white hover:bg-blue-600"
      />
    </Dropdown>
  )
}

export default FloatingMenu
