import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase/firebaseConfig'
import { onSnapshot, query, collection } from 'firebase/firestore'
import '../css/statscard.css'

function StatsCard({selectedMonth}) {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, "users", user.uid, "transactions"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let iSum = 0;
      let eSum = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        const txDate = data.createdAt?.toDate?.();

        if (txDate && txDate.getMonth() === selectedMonth.getMonth() && txDate.getFullYear() === selectedMonth.getFullYear()) {
          if (data.type === "income") {
            iSum += Number(data.amount);
          } else if (data.type === "expense") {
            eSum += Number(data.amount);
          }
        }
      });
      setIncome(iSum);
      setExpense(eSum);
    });
    return () => unsubscribe();
  },[selectedMonth]);

  const balance = income - expense;

  return (
    <div className='stats-card'>
      <div className='box'>
      <p className='income'>₹ {income}</p>
      <p className='title'>Income</p>
      </div>
      <div className='box'>
      <p className='expense'>₹ {expense}</p>
      <p className='title'>Expense</p>
      </div>
      <div className='box'>
      <p className='balance'>₹ {balance}</p>
      <p className='title'>Balance</p>
      </div>
    </div>
  )
}

export default StatsCard
