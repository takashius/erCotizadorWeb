import React from 'react'
import { Layout, Avatar, Dropdown, Switch } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { MoonOutlined, SunFilled } from '@ant-design/icons'
import UserMenu from './UserMenu'

const { Header: AntHeader } = Layout

interface HeaderProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => (
  <AntHeader className="bg-white dark:bg-gray-800 flex items-center justify-end p-4 shadow">
    <div className="flex items-center">
      <Switch
        checked={darkMode}
        onChange={toggleDarkMode}
        checkedChildren={<SunFilled />}
        unCheckedChildren={<MoonOutlined />}
        className="mr-4"
        style={{ transform: 'scale(1.2)', paddingLeft: 2, paddingRight: 2 }}
      />
      <Dropdown overlay={<UserMenu />}>
        <Avatar icon={<UserOutlined />} className="cursor-pointer" />
      </Dropdown>
    </div>
  </AntHeader>
)

export default Header
