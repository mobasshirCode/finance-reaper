import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase/firebaseConfig'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { isSameMonth } from 'date-fns';
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from 'recharts';

const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1',
  '#d0ed57', '#a4de6c', '#ffbb28', '#ff6666', '#66ccff'
];

function CatChart({selectedMonth}) {
    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) return;

        const q = query(collection(db, "users", user.uid, "transactions"));

        const unsubscribe = onSnapshot(q, (snapshot) => {

          const allTrans = snapshot.docs.map((doc) => ({
                id: doc.id, ...doc.data()
            }));
            const filtered = allTrans.filter((tx) => {
                const date = tx.createdAt?.toDate?.();
                return date && isSameMonth(date, selectedMonth);
            });

            const incomeMap = {};
            const expenseMap = {};

            filtered.forEach((tx) => {
                const cat = tx.category;
                if (tx.type === "income") {
                    incomeMap[cat] = (incomeMap[cat] || 0) + Number(tx.amount);
                } else if (tx.type === "expense") {
                    expenseMap[cat] = (expenseMap[cat] || 0) + Number(tx.amount);
                }
            })

            setIncomeData(Object.entries(incomeMap).map(([name, value]) => ({name, value})));
            setExpenseData(Object.entries(expenseMap).map(([name, value]) => ({name, value})));
        });
        return () => unsubscribe();
    },[selectedMonth]);

const renderPie = (data, title) => {
  const isEmpty = data.length === 0;

  const placeholderData = [{ name: 'No data', value: 1 }];

  return (
    <div style={{ flex: 1, padding: '1rem' }}>
      <h4 style={{ textAlign: 'center' }}>{title}</h4>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={isEmpty ? placeholderData : data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label={isEmpty ? false : true}
          >
            {(isEmpty ? placeholderData : data).map((_, index) => (
              <Cell
                key={index}
                fill={isEmpty ? '#e0e0e0' : COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          {isEmpty && (
            <Legend
              payload={[
                {
                  value: 'No data',
                  type: 'square',
                  color: '#e0e0e0',
                },
              ]}
            />
          )}
          {!isEmpty && <Legend />}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

  return (
    <>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {renderPie(incomeData, "Income by Category")}
      {renderPie(expenseData, "Expense by Category")}
    </div>
    </>
  )
}

export default CatChart
