import { useEffect } from 'react'
import { useRouter } from 'next/router'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'

export default (OriginalComponent) => {

  const Authenticate = (props) => {
    const router = useRouter();

    useEffect(() => {
      if (!props.isAuthenticated) {
        // setTimeout(() => {
        //   router.push('/')
        // }, 1000);
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
    let isAuthenticated = false;
    console.log(context)

    if (context.req && context.req.headers.cookie) {
      //Server
      const token = cookie.parse(context.req.headers.cookie)

      if (jwt.verify(token.authentication, 'someSupeRsECRET')) {
        isAuthenticated = true
      }
    } else {
      //Client to do
    }

    return {
      isAuthenticated
    }
  }

  return Authenticate
}

