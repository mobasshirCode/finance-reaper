import React from 'react'

function DateSelector({ selectedMonth, setSelectedMonth }) {
  const handleChange = (e) => {
    const [year, month] = e.target.value.split('-');
    const newDate = new Date(year, month - 1);
    setSelectedMonth(newDate);
  };

  return (
    <div>
      <input
        type="month"
        value={`${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth() + 1).padStart(2, '0')}`}
        onChange={handleChange}
      />
    </div>
  )
}

export default DateSelector
