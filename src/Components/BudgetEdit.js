import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BudgetEdit() {
  const baseAPI = process.env.REACT_APP_API_URL;
  const [editTransaction, setEditTransaction] = useState({
    item_name: "",
    amount: 0,
    date: "",
    from: "",
    catergory: "",
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
    axios
      .get(`${baseAPI}/budget/${index}`)
      .then((response) => {
        setEditTransaction(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [baseAPI, index]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${baseAPI}/budget/`, editTransaction)
      .then((response) => {
        setEditTransaction(response.data);
        navigate(`/budget`);
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

        <label htmlFor="catergory">Catergory:</label>
        <textarea
          id="catergory"
          value={editTransaction.catergory}
          onChange={handleTextChange}
          placeholder="Catergory"
        />

        <br />
        <input type="submit" />
      </form>
      <Link to={`/budget/${index}`}>
        <button>Back</button>
      </Link>
    </div>
  );
}
