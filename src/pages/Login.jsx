import React, { useState } from 'react'
import { auth, googleProvider } from '../firebase/firebaseConfig'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

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

  return (
    <div>
        <h2>Login</h2>
      <form>
        <input type="email" placeholder='Email' value={email} required onChange={(e) => setEmail(e.target.value)}></input>
        <br />
        <input type="password" placeholder='Password' value={password} required onChange={(e) => setPassword(e.target.value)}></input>
        <br />
        <button type='submit' onClick={handleLogin}>Login</button>
      </form>
      <br />
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      <br />
        <button onClick={() => navigate("/register")}>Register</button>
        <br />
        <button onClick={handleUseAsGuest}>Use as Guest</button>
    </div>
  )
}

export default Login
