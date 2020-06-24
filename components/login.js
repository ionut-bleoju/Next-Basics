import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styles from '../styles/form.module.scss'


export default function LogInForm({ hide }) {
  const router = useRouter();
  const [status, setStatus] = useState({ error: null, message: null })

  const onFinish = (values) => {
    axios({
      method: 'POST',
      url: '/api/login',
      data: { ...values },
      withCredentials: true
    }).then((response) => {
      setStatus({ error: false, message: 'Welcome' })
      router.push('/dashboard')
    }).catch((error) => {
      setStatus({ error: true, message: error.response.data.message })
    })
  }

  return (
    <div className={styles.form}>
      <h2 className={styles.form_title}>LogIn</h2>
      <Form
        name="logIn"
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Email is required'
            },
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            }
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="Email"
          />
        </ Form.Item>

        <Form.Item
          name="password"
          rules={[{
            required: true,
            message: 'Password is required!',
          }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item  >
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Submit
        </Button>
        </Form.Item>

        <Form.Item>
          <div className={status.error ? styles.error : styles.success} style={status.message ? {} : { display: 'none' }}>{status.message}</div>
          <Button type="link" htmlType="button" style={{ width: "100%" }} onClick={hide}>
            Sign In
          </Button>
        </Form.Item>

      </Form >
    </div>
  )
}
