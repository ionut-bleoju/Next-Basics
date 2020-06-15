import bcrypt from 'bcrypt'
import { getUserByEmail, addUser } from '../../lib/user'

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email, password, confirm } = req.body;
    if (password !== confirm) {
      res.status(400).json({ message: "Password don't match!" })
      return
    }

    try {
      let user = await getUserByEmail(email);

      if (user) {
        res.status(409).json({ message: "User already exists" })

        return
      }

      const hash = await bcrypt.hash(password, 10)
      user = await addUser(email, hash);


      res.status(200).json({ message: 'User created successful' })
    } catch (error) {
      res.status(500)
      console.error(error)
    }
  } else {
    res.status(405).json({ message: 'Methode not supported' })
  }
}
