// TODO http://localhost:3000/budgets/new -> attempts to allow for new transactions to be added in via form shown; can be accesed through New Budget button or edit button

import { useState } from "react";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { createTransaction } from "../api/fetch";

export default function BudgetNew() {
  const [newTransaction, setNewTransaction] = useState({
    item_name: "",
    amount: 0,
    date: "",
    from: "",
    category: "",
  });
  const navigate = useNavigate();
  // const { index} = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    newTransaction.amount = parseFloat(newTransaction.amount); // converts amount to a number before sending it
    createTransaction(newTransaction)
      .then((response) => {
        navigate(`/budgets/${response.index}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTextChange = (event) => {
    setNewTransaction({
      ...newTransaction,
      [event.target.id]: event.target.value,
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

        <label htmlFor="category">Category:</label>
        <textarea
          id="category"
          value={newTransaction.category}
          onChange={handleTextChange}
          placeholder="Category"
        />

        <br />
        <input type="submit" />
      </form>
      <Link to={`/budgets`}>
        <button>Back</button>
      </Link>
    </div>
  );
}
