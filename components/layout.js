import Head from 'next/head'
import style from '../styles/layout.module.scss'

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Next Recap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={style.container}>
        {children}
      </main >
    </div >
  )

}
