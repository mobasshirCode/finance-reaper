import React from 'react'
import '../css/footer.css'

function Footer() {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} Finance Reaper. All rights reserved.</p>
      <p>Made by Mobasshir Rahman</p>
    </footer>
  )
}

export default Footer
