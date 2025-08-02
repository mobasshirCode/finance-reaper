import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase/firebaseConfig'
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore'

function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  const handleDelete = async (id) => {
    const user = auth.currentUser;
      if (!user) return;

    const docRef = doc(db, "users", user.uid, "transactions", id);
    await  deleteDoc(docRef);
  };

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
            <th>Note</th>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id}>
              <td>{tx.title}</td>
              <td>{tx.type}</td>
              <td>{tx.category}</td>
              <td>
                ₹ {tx.amount}
              </td>
              <td>{tx.createdAt?.toDate().toLocaleString()}</td>
              <td>
                <button onClick={() => handleDelete(tx.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionList
