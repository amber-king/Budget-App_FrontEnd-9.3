import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"

export default function BudgetNew() {
 const navigate = useNavigate(); 
 const [newTransaction, setNewTransaction] = useState({
    item_name: "",
    amount: 0,
    date: "",
    from: "",
    catergory: "",
  });

  
const handleTextChange = (event) => {
    setNewTransaction({ ...newTransaction, [event.target.id]: event.target.value });
  };

 const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/budgets/`, newTransaction)
      .then(() => {
        navigate("/budget");
      })
      .catch((error) => {
        console.log(error);
      });
  };
 
  return (
    <div className="New">
    <form onSubmit={handleSubmit}>
      <label htmlFor="item_name">Item Name:</label>
      <input
        id="item_name"
        value={newTransaction.item_name}
        type="text"
        onChange={handleTextChange}
        placeholder="Item Name"
        required
      />
      <label htmlFor="amount">Amount:</label>
      <input
        id="amount"
        type="number"
        value={newTransaction.amount}
        onChange={handleTextChange}
      />
      <label htmlFor="from">From:</label>
      <input
        id="from"
        type="text"
        value={newTransaction.from}
        onChange={handleTextChange}
      />

      <label htmlFor="catergory">Catergory:</label>
      <textarea
        id="catergory"
        value={newTransaction.catergory}
        onChange={handleTextChange}
        placeholder="Catergory"
      />

      <br />
      <input type="submit" />
    </form>
    <Link to={`http://localhost:3000/budgets`}>
      <button>Back</button>
    </Link>
  </div>
  )
    
  
}