import { compare } from 'bcrypt'
import { getUserByEmail } from '../../lib/user'
import { sign } from 'jsonwebtoken'
import cookie from 'cookie'
import secret from '../../lib/secret'

const ONE_HOUR = 60 * 60 * 1;

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(400)
      return
    }

    try {
      let user = await getUserByEmail(email)

      if (user) {
        const isEqual = await compare(password, user.hash)
        if (isEqual) {

          const token = sign({
            sub: user.id,
            email: user.email
          }, secret, { expiresIn: ONE_HOUR })

          res.setHeader('Set-Cookie', cookie.serialize('authentication', token,
            {
              httpOnly: true,
              secure: false,
              sameSite: 'strict',
              maxAge: ONE_HOUR,
              path: '/'
            }))

          res.status(200).json({ message: 'Authentication successful' })
          return
        }
      }

      res.status(400).json({ message: 'Email or password are invalid!' })

    } catch (error) {
      console.error(error)
      res.status(500)
    }
  } else {
    res.status(405).json({ message: 'Methode not supported' })
  }

}
