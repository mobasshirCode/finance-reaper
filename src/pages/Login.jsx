import React, { useState } from 'react'
import { auth, googleProvider } from '../firebase/firebaseConfig'
import { signInWithEmailAndPassword, signInWithPopup, signInAnonymously, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import '../css/login.css'
import { FcGoogle } from "react-icons/fc";
import { GiSpy } from "react-icons/gi";

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
            console.log(error.message);
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
      <form  onSubmit={handleLogin}>
        <input type="email" autoFocus placeholder='Email' value={email} required onChange={(e) => setEmail(e.target.value)} />
        <br />
        <input type="password" placeholder='Password' value={password} required onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type='submit'>Login</button>
      </form>
      <br />
        <button onClick={signInWithGoogle}>Sign in with Google <FcGoogle/></button>
      <br />
        <button onClick={() => navigate("/register")}>Sign Up</button>
        <br />
        <button onClick={handleGuest}>Continue Anonymously <GiSpy /></button>
    </div>
    </div>
  )
}

export default Login
