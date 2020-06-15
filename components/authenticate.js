import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { parse } from 'cookie'
import { verify } from 'jsonwebtoken'
import secret from '../lib/secret'

import axios from 'axios'

export default (OriginalComponent) => {

  const Authenticate = (props) => {
    const router = useRouter()

    useEffect(() => {
      if (!props.isAuthenticated) {
        setTimeout(() => {
          router.push('/')
        }, 2000);
      }
    }, [])

    return (
      <>
        {
          props.isAuthenticated ?
            < OriginalComponent {...props} /> :
            'You are not authenticated'
        }
      </>
    )
  }

  Authenticate.getInitialProps = async (context) => {
    let isAuthenticated = false
    let pageProps = {}

    if (OriginalComponent.getInitialProps) {
      pageProps = await OriginalComponent.getInitialProps(context)
    }

    if (context.req && context.req.headers.cookie) {
      const token = parse(context.req.headers.cookie)

      if (verify(token.authentication, secrete)) {
        isAuthenticated = true
      }
    } else {
      const { data } = await axios({
        method: 'GET',
        url: '/api/check-auth',
        withCredentials: true
      })
      isAuthenticated = data.isAuthenticated
    }

    return {
      isAuthenticated,
      ...pageProps
    }
  }

  return Authenticate
}

