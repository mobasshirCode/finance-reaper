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
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: 'white' }}>
        Welcome to your <span style={{color: '#3b82f6b'}}>Dashboard</span>
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
