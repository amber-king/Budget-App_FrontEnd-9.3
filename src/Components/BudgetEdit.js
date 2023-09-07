// TODO: http://localhost:3000/budgets/edit -> attempts to edit transactions via edit button on the pages, redirects you to new form page to POST a new transaction

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BudgetEdit() {
  const [editTransaction, setEditTransaction] = useState({
    item_name: "",
    amount: 0,
    date: "",
    from: "",
    category: "",
  });
  let { index } = useParams();
  let navigate = useNavigate();

  const handleTextChange = (event) => {
    setEditTransaction({
      ...editTransaction,
      [event.target.id]: event.target.value,
    });
  };

  useEffect(() => {
    console.log("Edit Form: Fetching data from index", index);
    axios
      .get(`${process.env.REACT_APP_API_URL}/budgets/${index}`)
      .then((response) => {
        console.log("Edit Form: Response data", response);
        setEditTransaction(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.log("Edit form: Error fetching data", error);
      });
  }, [index]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Edit Form; Submitting data", editTransaction);
    axios
      .put(`${process.env.REACT_APP_API_URL}/budgets/${index}`, editTransaction)
      .then((response) => {
        console.log("Edit Form: Edit successful", response);

        // setEditTransaction(response.data);
        navigate(`/budgets`);
      })
      .catch((error) => {
        console.log("Edit Form: Error editing data", error);
      });
  };
  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="item_name">Item Name:</label>
        <input
          id="item_name"
          value={editTransaction.item_name}
          type="text"
          onChange={handleTextChange}
          placeholder="Item Name"
          required
        />
        <label htmlFor="amount">Amount:</label>
        <input
          id="amount"
          type="number"
          value={editTransaction.amount}
          onChange={handleTextChange}
        />
        <label htmlFor="from">From:</label>
        <input
          id="from"
          type="text"
          value={editTransaction.from}
          onChange={handleTextChange}
        />

        <label htmlFor="category">Category:</label>
        <textarea
          id="category"
          value={editTransaction.category}
          onChange={handleTextChange}
          placeholder="Category"
        />

        <br />
        <input type="submit" />
      </form>
      <Link to={`/budgets/${index}`}>
        <button>Back</button>
      </Link>
    </div>
  );
}
