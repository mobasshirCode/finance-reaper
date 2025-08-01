import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate} from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';

import Login from "./pages/Login";
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';


function App() {
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        setIsGuest(false);
        navigate("/dashboard");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUseAsGuest = () => {
    setUser(null);
    setIsGuest(true);
    navigate("/dashboard");
  };


  return (
    <>
    <Routes>
    <Route path='/' element={<Login handleUseAsGuest={handleUseAsGuest} />} />
    <Route path='/register' element={<Register />} />
    <Route path='/dashboard' element={<Dashboard user={user} isGuest={isGuest} />} />
    </Routes>
    </>
  )
}

export default App;
