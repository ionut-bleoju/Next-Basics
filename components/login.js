import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'
import style from '../styles/form.module.scss'


export default function LogInForm({ hide }) {
  const onFinish = (values) => {
    axios({
      method: 'POST',
      url: `${window.location.href}api/login`,
      data: { ...values },
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <div className={style.container}>
      <h2 className={style.title}>LogIn</h2>
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
          <Button type="link" htmlType="button" style={{ width: "100%" }} onClick={hide}>
            Sign In
          </Button>
        </Form.Item>

      </Form >
    </div>
  )
}
