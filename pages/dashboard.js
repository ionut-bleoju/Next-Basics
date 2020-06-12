import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import RequireAuth from '../components/authenticate';

 function Dashboard() {
  return (
    <div>
      Dashboard
    </div>
  )
}

export default RequireAuth(Dashboard)

// middlewere logare
// din request , la fiecare request hoc , app , gip