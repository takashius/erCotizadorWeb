import { useTranslation } from 'react-i18next'
import { Layout, Menu } from 'antd'
import { HomeOutlined, SettingOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import SubMenu from 'antd/es/menu/SubMenu'
import './Sidebar.css'

const { Sider } = Layout;

const Sidebar = () => {
  const { t } = useTranslation()

  return (
    <Sider
      breakpoint="md"
      collapsedWidth="80"
      className="bg-blue-600 dark:bg-gray-800 text-white"
    >
      <div className="hidden md:flex items-center justify-center p-4">
        <img src="/logoBlanco.png" alt="Logo" className="h-16" />
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={['1']}
        className="bg-blue-600 dark:bg-gray-800 text-white dark:text-gray-300"
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/" className="text-white dark:text-white">{t('menu.home')}</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to="/clients" className="text-white dark:text-gray-300">Clientes</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ShoppingOutlined />}>
          <Link to="/products" className="text-white dark:text-gray-300">Productos</Link>
        </Menu.Item>
        <SubMenu
          key="sub1"
          icon={<SettingOutlined />}
          title={<span>Configuración</span>}
          className="bg-blue-600 dark:bg-gray-800"
        >
          <Menu.Item key="4" className="bg-blue-600 dark:bg-gray-800 text-white dark:text-gray-300">
            <Link to="/settings/general" className="text-white dark:text-gray-300">General</Link>
          </Menu.Item>
          <Menu.Item key="5" className="bg-blue-600 dark:bg-gray-800 text-white dark:text-gray-300">
            <Link to="/settings/pdf" className="text-white dark:text-gray-300">Ajustes de PDF</Link>
          </Menu.Item>
          <Menu.Item key="6" className="bg-blue-600 dark:bg-gray-800 text-white dark:text-gray-300">
            <Link to="/settings/email" className="text-white dark:text-gray-300">Ajustes de Email</Link>
          </Menu.Item>
          <Menu.Item key="7" className="bg-blue-600 dark:bg-gray-800 text-white dark:text-gray-300">
            <Link to="/settings/company" className="text-white dark:text-gray-300">Cambiar de Empresa</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  )
}

export default Sidebar
