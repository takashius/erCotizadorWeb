import { useTranslation } from 'react-i18next'
import { Layout, Menu } from 'antd'
import { HomeOutlined, SettingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Sider } = Layout;

const Sidebar = () => {
  const { t } = useTranslation()

  return (
    <Sider className="bg-blue-600 dark:bg-gray-800">
      <div className="flex items-center justify-center p-4">
        <img src="/logoBlanco.png" alt="Logo" className="h-16" />
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} className="bg-blue-600 dark:bg-gray-800 text-white dark:text-gray-300">
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/" className="text-white dark:text-gray-300">{t('menu.home')}</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<SettingOutlined />}>
          <Link to="/settings" className="text-white dark:text-gray-300">{t('menu.settings')}</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default Sidebar
