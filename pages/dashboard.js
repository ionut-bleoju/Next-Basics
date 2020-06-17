import RequireAuth from '../components/authenticate';
import Layout from '../components/layout'

function Dashboard() {
  return (
    <Layout>
      Dashboard
    </Layout>
  )
}

export default RequireAuth(Dashboard)
