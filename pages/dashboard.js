import RequireAuth from '../components/authenticate';

 function Dashboard() {
  return (
    <div>
      Dashboard
    </div>
  )
}

export default RequireAuth(Dashboard)
