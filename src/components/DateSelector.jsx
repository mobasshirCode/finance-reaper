import React from 'react'
import '../css/dateselector.css'

function DateSelector({ selectedMonth, setSelectedMonth }) {
  const handleChange = (e) => {
    const [year, month] = e.target.value.split('-');
    const newDate = new Date(year, month - 1);
    setSelectedMonth(newDate);
  };

  return (
    <div className='date'>
      <input
        type="month"
        value={`${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth() + 1).padStart(2, '0')}`}
        onChange={handleChange}
      />
    </div>
  )
}

export default DateSelector
