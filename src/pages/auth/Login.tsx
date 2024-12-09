import React from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const onFinish = (values: any) => {
    console.log('Success:', values)
    navigate('/')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-16"
          />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-300">{t('login.title')}</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: t('login.usernameRequired') }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={t('login.username')} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: t('login.passwordRequired') }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={t('login.password')}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{t('login.rememberMe')}</Checkbox>
            </Form.Item>
            <Link to="/recover-password" className="float-right">
              {t('login.forgotPassword')}
            </Link>
          </Form.Item>
          <Form.Item>
            <div className="flex space-x-2">
              <Button type="primary" htmlType="submit" className="w-1/2">
                {t('login.login')}
              </Button>
              <div className="w-1/2">
                <Link to="/register" className="flex justify-center">
                  <Button type="default" className="w-full">
                    {t('login.register')}
                  </Button>
                </Link>
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
