import axios from 'axios'

export default async (context) => {
  const { data } = await axios({
    method: 'GET',
    url: '/api/check-auth',
    withCredentials: true
  })

  return data.isAuthenticated
}