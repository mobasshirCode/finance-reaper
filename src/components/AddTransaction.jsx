import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase/firebaseConfig'
import { collection, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore'

function AddTransaction() {
    //got this format code from google
    const formatDateForInput = (date) => {
    const pad = (n) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    };

    const [title,setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("expense");
    const [category, setCategory] = useState("");
    const [customDate, setCustomDate] = useState(formatDateForInput(new Date()));
    const [loading, setLoading] = useState(false);

    const incomeCategories = ["Salary", "Refund", "Gift", "Interest", "Lottery", "Other"];
    const expenseCategories = ["Food", "Drinks", "Rent", "Shopping", "Bills", "Travel", "Health", "Other"];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);

        const user = auth.currentUser;
        if (!user) return alert("User not logged in.");
        if (!title || !amount || !type || !category) return alert("Invalid Input");

        try {
            await addDoc(collection(db, "users", user.uid, "transactions"), {
                title, amount: parseFloat(amount), type, category, createdAt: Timestamp.fromDate(new Date(customDate)),
            });
          setTitle("");
          setAmount("");
          setType("expense");
          setCategory("");
        }
        catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type='datetime-local' value={customDate} onChange={(e)=> setCustomDate(e.target.value)} />
            <input type="text" value={title} placeholder='Note (e.g. tea, bus)' required onChange={(e) => setTitle(e.target.value)} />
            <input type="number" value={amount} placeholder='Amount' required onChange={(e) => setAmount(e.target.value)} />
            <select value={type} required onChange={(e) => setType(e.target.value)}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
            </select>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option disabled value="">--Select a category--</option>
                {(type === "income" ? incomeCategories : expenseCategories).map((cat) => (
                    <option key={cat} value={cat}>{ cat }</option>
                ))}
            </select>
            <button type='submit' disabled={loading}> {loading ? "Wait" : "Add"}</button>
        </form>
    </div>
  )
}

export default AddTransaction
