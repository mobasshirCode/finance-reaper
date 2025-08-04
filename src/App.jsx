import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate} from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';

import Login from "./pages/Login";
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import About from './pages/About';


function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        navigate("/dashboard");
      }
    });

    return () => unsubscribe();
  }, []);


  return (
    <>
    <Navbar />
    <Routes>
    <Route path='/' element={<Login />} />
    <Route path='/about' element={<About />} />
    <Route path='/register' element={<Register />} />
    <Route path='/dashboard' element={user ? <Dashboard user={user} /> : <Login />} />
    </Routes>
    </>
  )
}

export default App;
