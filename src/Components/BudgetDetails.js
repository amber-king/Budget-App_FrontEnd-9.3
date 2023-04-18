// TODO: http://localhost:3000/budgets/details -> will appear blank but connects to displaying details of the transactions clicked via the index page 

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FourOFour from "../Pages/FourOFour";
import axios from "axios";

function BudgetDetails() {
  const [listBudget, setListBudgets] = useState([]);
  let { index } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3333/transactions/${index}`)
      .then((response) => {
        setListBudgets(response.data);
      })
      .catch(() => {
        navigate(FourOFour);
      });
  }, [index, navigate]);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3333/transactions/${index}`)
      .then(() => {
        navigate("/budgets");
      });
  };
  return (
    <div className="accountDetails">
      <h1>Budget Details ⤵️ </h1>
      <h3>
        Item Name ➡️ {listBudget.item_name}
        <br></br>
        Amount ➡️ $ {listBudget.amount}
        <br></br>
        Date ➡️ {listBudget.date}
        <br></br>
        From ➡️ {listBudget.from}
        <br></br>
        Catergory ➡️ {listBudget.catergory}
        <br></br>
      </h3>

      <div className="backBtn">
        <Link to={`http://localhost:3000/budgets`}>
          <button>Back</button>
        </Link>
      </div>
      <br></br>
      <div className="editBtn">
        <Link to={`http://localhost:3000/budgets/new`}>
          <button>Edit</button>
        </Link>
      </div>
      <br></br>
      <div className="deleteBtn">
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default BudgetDetails;
