import React, { useEffect, useState } from 'react'
import { isSameMonth } from 'date-fns';
import { auth, db } from '../firebase/firebaseConfig'
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore'
import '../css/transactionlist.css'
import { MdDeleteForever } from "react-icons/md";

function TransactionList({ selectedMonth }) {
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
        const allData = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
        const filterData = allData.filter((tx) => {
          const date = tx.createdAt?.toDate?.();
          return date && isSameMonth(date, selectedMonth)
        });
        setTransactions(filterData);
      });
     
    return () => unsubscribe();
    },[selectedMonth]);

  return (
    <div className='list-container'>
      <table>
        <thead>
          <tr>
            <th>Note</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date & Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id} className={tx.type === 'income' ? 'income-row' : 'expense-row'}>
              <td>{tx.title}</td>
              <td>{tx.category}</td>
              <td>
                ₹{tx.amount}
              </td>
              <td>{tx.createdAt?.toDate().toLocaleString(undefined, {
                  month: 'short',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}</td>
              <td>
                <button className='delbtn' onClick={() => handleDelete(tx.id)}><MdDeleteForever /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionList
