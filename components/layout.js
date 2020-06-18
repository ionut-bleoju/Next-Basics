import Head from 'next/head'
import Navbar from './navbar'
import styles from '../styles/layout.module.scss'

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next Recap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Navbar />
      </header>
      <main >
        {children}
      </main >
      <footer />
    </div >
  )

}
