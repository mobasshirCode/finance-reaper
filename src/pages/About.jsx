import React from 'react'

function About() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem',color:'white' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>About Finance Reaper</h1>
      <p style={{ lineHeight: '1.8' }}>
        <strong>Finance Reaper</strong> is a personal finance tracker I created to help individuals stay in control of their daily expenses and income. 
        The idea for this project came from a personal need — managing money manually in a notebook or spreadsheet was inefficient, especially for recurring expenses.
      </p>

      <h2 style={{ marginTop: '2rem' }}>🎯 Purpose</h2>
      <p style={{ lineHeight: '1.8' }}>
        The purpose of this project is to:
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>Simplify daily income and expense tracking</li>
          <li>Provide a visual breakdown of spending categories</li>
          <li>Help users make smarter financial decisions based on their data</li>
        </ul>
      </p>

      <h2 style={{ marginTop: '2rem' }}>🛠️ Key Features</h2>
      <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
        <li>Add income or expense transactions with a note and amount</li>
        <li>Filter transactions by month using a date selector</li>
        <li>Visualize category-wise spending with pie charts</li>
        <li>Get monthly income, expense, and balance summaries</li>
        <li>Support for guest mode and Firebase authentication</li>
        <li>Firebase Firestore integration for real-time data storage</li>
      </ul>

      <h2 style={{ marginTop: '2rem' }}>💡 Tech Stack</h2>
      <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
        <li><strong>React</strong> – for building the frontend UI</li>
        <li><strong>Firebase Auth & Firestore</strong> – for authentication and data storage</li>
        <li><strong>Recharts</strong> – for visualizing data through graphs</li>
        <li><strong>CSS</strong> – for styling and responsive design</li>
      </ul>

      <h2 style={{ marginTop: '2rem' }}>📌 Future Improvements</h2>
      <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
        <li>Add support for monthly budgets</li>
        <li>Enable export of reports as PDF/CSV</li>
        <li>Implement charts showing trends over time</li>
        <li>Support user-defined categories</li>
      </ul>

      <p style={{ marginTop: '2rem', fontStyle: 'italic' }}>
        Thanks for visiting! I hope Finance Reaper helps you manage your money smarter. 💰
      </p>
    </div>
  )
}

export default About
