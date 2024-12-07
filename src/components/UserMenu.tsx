import { useTranslation } from 'react-i18next'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'

const UserMenu = () => {
  const { t } = useTranslation()

  return (
    <Menu>
      <Menu.Item key="1">
        <Link to="/users">{t('menu.profile')}</Link>
      </Menu.Item>
      <Menu.Item key="2">
        {t('menu.logout')}
      </Menu.Item>
    </Menu>
  )
}

export default UserMenu
