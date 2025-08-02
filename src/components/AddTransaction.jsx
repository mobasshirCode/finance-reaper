import React, { useState } from 'react'
import { auth, db } from '../firebase/firebaseConfig'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

function AddTransaction() {
    const [title,setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("expense")
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);

        const user = auth.currentUser;
        if (!user) return alert("User not logged in.");
        if (!title || !amount || !type) return alert("Invalid Input");

        try {
            await addDoc(collection(db, "users", user.uid, "transactions"), {
                title, amount: parseFloat(amount), type, createdAt: serverTimestamp(),
            });
          setTitle("");
          setAmount("");
          setType("expense");
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
            <input type="text" value={title} placeholder='Title (e.g. Salary, Rent)' required onChange={(e) => setTitle(e.target.value)} />
            <input type="number" value={amount} placeholder='Amount' required onChange={(e) => setAmount(e.target.value)} />
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
            </select>
            <button type='submit' disabled={loading}> {loading ? "Wait" : "Add"}</button>
        </form>
    </div>
  )
}

export default AddTransaction
