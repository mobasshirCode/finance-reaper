import React, { useState } from 'react'
import { auth, googleProvider } from '../firebase/firebaseConfig'
import { createUserWithEmailAndPassword, signInWithPopup, signInAnonymously } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import '../css/register.css'
import { FcGoogle } from "react-icons/fc";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
          if(password === cpassword) {
            await createUserWithEmailAndPassword(auth, email, password);
          } else {
            alert("Passwords do not match.")
          }
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

  return (
    <div className='reg-container'>
      <div className="reg-box">
      <h2>Sign up</h2>
      <form  onSubmit={handleRegister}>
        <input autoFocus type="email" placeholder='Email' value={email} required onChange={(e) => setEmail(e.target.value)} />
        <br />
        <input type="password" placeholder='Password' value={password} required onChange={(e) => setPassword(e.target.value)} />
        <br />
        <input type="password" placeholder='Confirm Password' value={cpassword} required onChange={(e) => setCpassword(e.target.value)} />
        <br />
        <button type='submit'>Sign Up</button>
      </form>
      <br />
        <button onClick={signInWithGoogle}>Sign in with Google <FcGoogle /></button>
      <br />
      <p>Already have an account? </p>
        <button onClick={() => navigate("/")}>Login</button>
    </div>
    </div>
  )
}

export default Register
