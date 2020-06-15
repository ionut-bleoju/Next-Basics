import { verify } from 'jsonwebtoken'
import { parse } from 'cookie'
import secrete from '../../lib/secret'

export default (req, res) => {
  if (req.method === 'GET') {
    const token = parse(req.headers.cookie).authentication

    if (token && verify(token, secrete)) {
      res.status(200).json({ isAuthenticated: true })
      return
    }

    res.status(401).json({ isAuthenticated: false })
  } else {
    res.status(405).json({ message: 'Methode not supported' })
  }
}
