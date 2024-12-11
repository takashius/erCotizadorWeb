import { useTranslation } from 'react-i18next'
import { Menu } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const UserMenu = () => {
  const { t } = useTranslation()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Menu>
      <Menu.Item key="1">
        <Link to="/users">{t('menu.profile')}</Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>
        {t('menu.logout')}
      </Menu.Item>
    </Menu>
  )
}

export default UserMenu