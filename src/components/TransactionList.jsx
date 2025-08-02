import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase/firebaseConfig'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'

function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, "users", user.uid, "transactions"),
        orderBy("createdAt", "desc")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
        setTransactions(data);
      });
     
    return () => unsubscribe();
    },[]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id}>
              <td>{tx.createdAt?.toDate().toLocaleString()}</td>
              <td>{tx.type}</td>
              <td>
                ₹ {tx.amount}
              </td>
              <td>{tx.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionList
