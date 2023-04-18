import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"

export default function NewLogForm() {
 const navigate = useNavigate(); 
 const baseAPI = process.env.REACT_APP_API_URL;
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
      .post(`${baseAPI}/budget`, newTransaction)
      .then(() => {
        navigate("/budget");
      })
      .catch((error) => {
        console.log(error);
      });
  };
 
  return (
    <div className="Edit">
    <form onSubmit={handleSubmit}>
      <label htmlFor="itemName">Item Name:</label>
      <input
        id="itemName"
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
    <Link to={`/budget/`}>
      <button>Back</button>
    </Link>
  </div>
  )
    
  
}