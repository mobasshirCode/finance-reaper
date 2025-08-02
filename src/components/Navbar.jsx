import React from 'react'
import { NavLink } from 'react-router-dom'
import { auth } from '../firebase/firebaseConfig'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import '../index.css'

function Navbar() {
    const user = auth.currentUser;
    const navigate = useNavigate();

    const handleSignOut = async (e) => {
      e.preventDefault();
      try {
        await signOut(auth);
        navigate("/");

      } catch (error) {
        alert(error.message)
      }
    }

  return (
    <nav>
      <div className='left'>Finance Reaper</div>
      <div className="right">
        {user?.email ? (
          <>
          <span>Welcome, {user.email}</span> 
          <button onClick={handleSignOut}>Logout</button>
          </>
         ) : (
          <>
          <span>Welcome, Guest..!</span>
          <button onClick={() => navigate("/")}>Login</button>
          </>
          
         )}
      </div>
    </nav>
  )
}

export default Navbar
