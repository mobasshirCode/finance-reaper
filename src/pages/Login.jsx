import React, { useState } from 'react'
import { auth, googleProvider } from '../firebase/firebaseConfig'
import { signInWithEmailAndPassword, signInWithPopup, signInAnonymously, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import '../css/login.css'

function Login({ handleUseAsGuest }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            alert(error.message);
        }
    }
    const signInWithGoogle = async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            alert(error.message);
        }
    }
    const handleGuest = async (e) => {
        if (auth.currentUser) {
            await signOut(auth);
        }
        try {
            await signInAnonymously(auth);
        } catch (error) {
            alert(error.message);
        }
    }

  return (
    <div className='login-container'>
        <div className="login-box">
        <h2>Login</h2>
      <form>
        <input type="email" autoFocus placeholder='Email' value={email} required onChange={(e) => setEmail(e.target.value)} />
        <br />
        <input type="password" placeholder='Password' value={password} required onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type='submit' onClick={handleLogin}>Login</button>
      </form>
      <br />
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      <br />
        <button onClick={() => navigate("/register")}>Register</button>
        <br />
        <button onClick={handleGuest}>Continue Anonymously</button>
    </div>
    </div>
  )
}

export default Login
