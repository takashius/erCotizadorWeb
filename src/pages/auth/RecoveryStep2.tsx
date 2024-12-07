import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Input, Button, InputRef } from 'antd'
import { Link } from 'react-router-dom'

const RecoveryStep2: React.FC = () => {
  const { t } = useTranslation()
  const [code, setCode] = useState<string[]>(new Array(6).fill(''))
  const inputsRef = useRef<(InputRef | null)[]>([])

  const onFinish = (values: any) => {
    const fullCode = code.join('')
    console.log('Code:', fullCode, 'Values:', values)
  }

  const handleInputChange = (index: number, value: string) => {
    if (/^\d$/.test(value)) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)

      if (index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      const newCode = [...code]
      if (index > 0) {
        if (newCode[index]) {
          newCode[index] = ''
        } else {
          newCode[index - 1] = ''
        }
        inputsRef.current[index - 1]?.focus()
      } else {
        newCode[index] = ''
      }
      setCode(newCode)
    }
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
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-300">{t('recoverStep2.title')}</h2>
        <Form
          name="recovery_step2"
          onFinish={onFinish}
        >
          <div className="flex justify-center mb-4 space-x-2">
            {code.map((_, index) => (
              <Input
                key={index}
                ref={(el) => { inputsRef.current[index] = el }}
                maxLength={1}
                className="w-12 h-12 text-center text-xl"
                value={code[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          <Form.Item
            name="password"
            rules={[{ required: true, message: t('recoverStep2.passwordRequired') }]}
          >
            <Input.Password placeholder={t('recoverStep2.newPassword')} />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: t('recoverStep2.confirmPasswordRequired') },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error(t('recoverStep2.passwordMismatch')))
                },
              }),
            ]}
          >
            <Input.Password placeholder={t('recoverStep2.confirmPassword')} />
          </Form.Item>
          <Form.Item>
            <div className="flex space-x-2">
              <Button type="primary" htmlType="submit" className="w-1/2">
                {t('recoverStep2.submit')}
              </Button>
              <div className="w-1/2">
                <Link to="/login" className="flex justify-center">
                  <Button type="default" className="w-full">
                    {t('recoverStep2.backToLogin')}
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

export default RecoveryStep2
