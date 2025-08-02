import React from 'react'
import { auth } from '../firebase/firebaseConfig'

function Dashboard() {
    const user = auth.currentUser;
    
  return (
    <div>
      <h2>
        This is the main body of the Dashboard
      </h2>
    </div>
  )
}

export default Dashboard
