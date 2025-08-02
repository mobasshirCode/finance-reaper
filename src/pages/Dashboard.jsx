import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase/firebaseConfig'
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import AddTransaction from '../components/AddTransaction';
import TransactionList from '../components/TransactionList';


function Dashboard() {
    const user = auth.currentUser;
    
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
      <TransactionList />
    </div>
  )
}

export default Dashboard
