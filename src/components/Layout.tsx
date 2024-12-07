import { Layout as AntLayout } from 'antd'
import { Outlet } from "react-router-dom"
import Sidebar from './Sidebar'
import Header from './Header'
import { useState } from 'react'

const { Content } = AntLayout;

const Layout = () => {
  const [darkMode, setDarkMode] = useState(false)
  const toggleDarkMode = () => { setDarkMode(!darkMode) }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <AntLayout className="min-h-screen">
        <Sidebar />
        <AntLayout>
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Content className="p-4">
            <Outlet />
          </Content>
        </AntLayout>
      </AntLayout>
    </div>
  );
};

export default Layout;
