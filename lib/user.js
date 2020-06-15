import db from './db'

const getUserById = async (id) => {
  const { rows } = await db('SELECT id, email, hash from "user" where id=$1', [id]);

  return rows[0]
}

const getUserByEmail = async (email) => {
  const { rows } = await db('SELECT id, email, hash from "user" where email=$1', [email]);
  
  return rows[0]
}

const addUser = async (email, hash) => {
  const { rows } = await db('INSERT INTO "user" (email, hash) VALUES($1,$2) returning id', [email, hash])

  return {
    id: rows[0].id,
    email,
    hash
  }
}


export {
  getUserById,
  getUserByEmail,
  addUser
}