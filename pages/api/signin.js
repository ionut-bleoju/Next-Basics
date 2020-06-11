import bcrypt from 'bcrypt'
import db from '../../lib/db'

export default async (req, res) => {
  const { email, password, confirm } = req.body;
  if (password != confirm) {
    res.status(400).json({ message: "Password don't match!" })

    return
  }

  try {
    const { rows: entries } = await db('SELECT id, email, hash from "user" where email=$1', [email])

    if (entries.length > 0) {
      res.status(409).json({ message: "User already exists" })

      return
    }

    const hash = await bcrypt.hash(password, 10)
    await db('INSERT INTO "user" (email, hash) VALUES($1,$2)', [email, hash])

    res.status(200).json({ message: 'User created successful' })
  } catch (error) {
    res.status(500)
    console.error(error)
  }
}
