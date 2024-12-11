import { Layout as AntLayout } from 'antd'
import { Outlet } from "react-router-dom"
import Sidebar from './Sidebar'
import Header from './Header'
import { useState } from 'react'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

const { Content } = AntLayout;

const Layout = () => {
  const [darkMode, setDarkMode] = useState(false)
  const toggleDarkMode = () => { setDarkMode(!darkMode) }
  const [client] = useState(new QueryClient())

  return (
    <QueryClientProvider client={client}>
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
    </QueryClientProvider>
  );
};

export default Layout;
