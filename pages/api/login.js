import { compare } from 'bcrypt'
import db from '../../lib/db'
import { sign } from 'jsonwebtoken'
import cookie from 'cookie'
import secrete from '../../lib/secret'

const ONE_HOUR = 60 * 60 * 1;

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(400)
      return
    }

    try {
      const { rows } = await db('SELECT id, email, hash from "user" where email=$1', [email])

      if (rows.length > 0) {
        const isEqual = await compare(password, rows[0].hash)
        if (isEqual) {

          const token = sign({
            sub: rows.id,
            email: rows.email
          }, secrete, { expiresIn: ONE_HOUR })

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
    res.status(405).json({message: 'Methode not supported'})
  }

}
