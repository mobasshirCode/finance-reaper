import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase/firebaseConfig'
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import AddTransaction from '../components/AddTransaction';


function Dashboard() {
    const user = auth.currentUser;
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
      if (!user) return;

      const q = query(
        collection(db, "users", user.uid, "transactions")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
        setTransactions(data);
      });

      return () => unsubscribe();
    }, [user]);
    
  return (
    <div style={{padding: "1rem"}}>
      <h2>
        {user?.email ? `Welcome, ${user.email}` : "Welcome, Guest!"}
      </h2>
      <hr />
      <h3>Add Transaction</h3>
      <AddTransaction />
      <h3>Stats</h3>
      <h3>Transaction List</h3>
    </div>
  )
}

export default Dashboard
