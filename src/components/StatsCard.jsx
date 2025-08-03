import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase/firebaseConfig'
import { onSnapshot, query, collection } from 'firebase/firestore'

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
    <div>
      <p><strong>Income : {income}</strong></p>
      <p><strong>Expense : {expense}</strong></p>
      <p><strong>Balance : {balance}</strong></p>
    </div>
  )
}

export default StatsCard
