import { Menu } from 'antd';
import Link from 'next/link'
import { UserOutlined, RedditOutlined } from '@ant-design/icons'
import styles from '../styles/navbar.module.scss'

export default function Navbar() {
  return (
    <div className={styles.navigation}>
      <div className={styles.logo}>
        <Link href='/' >
          <a >
            <img src='/pokeball.svg' style={{ width: '40px' }}></img>
          </a>
        </Link>
      </div>

      <Menu mode="horizontal" className={styles.list}>
        <Menu.Item key="mail" icon={<RedditOutlined />} style={{ display: 'inline-block' }}>
          <Link href="/pokedex">
            <a>
              Pokedex
            </a>
          </Link>
        </Menu.Item>

        <Menu.Item key="alipay" icon={<UserOutlined />} style={{ display: 'inline-block' }}>
          <Link href='/'>
            <a>
              My Account
            </a>
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}
