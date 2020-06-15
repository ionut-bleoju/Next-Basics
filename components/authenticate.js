import { useEffect } from 'react'
import { useRouter } from 'next/router'
import AuthChecker from 'AuthChecker'

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

    isAuthenticated = await AuthChecker(context)

    return {
      isAuthenticated,
      ...pageProps
    }
  }

  return Authenticate
}

