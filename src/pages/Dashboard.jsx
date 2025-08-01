import React from 'react'
import { auth } from '../firebase/firebaseConfig'

function Dashboard() {
    const user = auth.currentUser;
    
  return (
    <div>
      <h2>
        {user?.isAnonymous ? "Welcome, Guest..!" : `Welcome, ${user.email}`}
      </h2>
    </div>
  )
}

export default Dashboard
