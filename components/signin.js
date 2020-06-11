import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'
import style from '../styles/form.module.scss'


export default function SignInForm({ hide }) {
  const onFinish = (values) => {
    axios({
      method: 'POST',
      url: `${window.location.href}api/signin`,
      data: { ...values }
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    })

  }

  return (
    <div className={style.container}>
      <h2 className={style.title}>SignIn</h2>
      <Form
        name="signIn"
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

        <Form.Item
          name="confirm"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject('Passwords must match!');
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm password"
          />
        </Form.Item>

        <Form.Item  >
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Submit
        </Button>
        </Form.Item>

        <Form.Item>
          <Button type="link" htmlType="button" style={{ width: "100%" }} onClick={hide}>
            LogIn In
          </Button>
        </Form.Item>
      </Form >
    </div>
  )
}