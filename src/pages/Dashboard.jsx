import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/firebaseConfig'
import AddTransaction from '../components/AddTransaction';
import TransactionList from '../components/TransactionList';
import StatsCard from '../components/StatsCard';
import CatChart from '../components/CatChart';
import DateSelector from '../components/DateSelector';


function Dashboard() {
    const user = auth.currentUser;
    const [selectedMonth,setSelectedMonth] = useState(new Date());
    
  return (
    <div style={{padding: "1rem"}}>
      <h2>
        {user?.email ? `Welcome, ${user.email}` : "Welcome, Guest!"}
      </h2>
      <hr />
        <DateSelector
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        />
      <StatsCard selectedMonth={selectedMonth} />
      <CatChart selectedMonth={selectedMonth}/>
      <AddTransaction />
      <TransactionList selectedMonth={selectedMonth} />
    </div>
  )
}

export default Dashboard
