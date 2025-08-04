import React from 'react'
import { NavLink } from 'react-router-dom'
import { auth } from '../firebase/firebaseConfig'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import '../css/navbar.css'

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
      <div className="super-right">
        <div>
        <NavLink to="/about" className='abt'>About</NavLink>
        </div>
      <div className="right">
        {user?.email ? (
          <>
          <span>{user.email}</span> 
          <button onClick={handleSignOut}>Logout</button>
          </>
         ) : (
          <>
          <span>Guest Mode</span>
          <button onClick={() => navigate("/")}>Login</button>
          </>
          
         )}
         </div>
      </div>
    </nav>
  )
}

export default Navbar
