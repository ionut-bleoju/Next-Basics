import Layout from '../components/layout'
import SignInForm from '../components/signin'
import LogInForm from '../components/login'
import { useState } from 'react'

export default function Home() {
    const [logIn, setlogIn] = useState(true)

    const changeDispleydForm = () => {
        setlogIn(!logIn)
    }

    return (
        <Layout>
            {logIn ? <LogInForm hide={changeDispleydForm} /> : <SignInForm hide={changeDispleydForm} />}
        </Layout>
    )
}
