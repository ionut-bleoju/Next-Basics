import { parse } from 'cookie'
import { verify } from 'jsonwebtoken'
import secret from './secret'

export default (context) => {
  const token = parse(context.req.headers.cookie || '')

  if (token.authentication && verify(token.authentication, secret)) {
    return true
  }

  return false
}