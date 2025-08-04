import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdOutlineArrowBack } from "react-icons/md";

function About() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem',color:'white' }}>
      <NavLink to="/dashboard" className={'abt'}>Back to Dashboard</NavLink>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem', marginTop: '1rem' }}>About Finance Reaper</h1>
      <p style={{ lineHeight: '1.8' }}>
        <strong>Finance Reaper</strong> is a personal finance tracker I created to fulfill the final requirement of the <strong>CS50</strong> course. I will submit this as the Final Project.
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

      <h2 style={{ marginTop: '2rem' }}>📌 Tips</h2>
      <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
        <li>You can Register/SignUp to save and access your data accross devices</li>
        <li>Even in guest mode your data will remain in the same device</li>
        <li>Just visit the website with the same browser (but not in incognito mode)</li>
        <li>Guest data will be lost if you clear browser cookies/local storage</li>
      </ul>

      <p style={{ marginTop: '2rem', fontStyle: 'italic' }}>
        Thanks for visiting! I hope Finance Reaper helps you manage your money smarter. 💰
      </p>
    </div>
  )
}

export default About
