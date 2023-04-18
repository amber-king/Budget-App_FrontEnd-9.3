import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FourOFour from "../Pages/FourOFour";
import axios from "axios";

function BudgetDetails() {
  const [listBudget, setListBudgets] = useState([]);
  const baseAPI = process.env.REACT_APP_API_URL;
  let { index } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseAPI}/budget/${index}`)
      .then((response) => {
        // console.log(response);
        setListBudgets(response.data);
      })
      .catch(() => {
        navigate(FourOFour);
      });
  }, [index, navigate]);

  const handleDelete = () => {
    axios.delete(`${baseAPI}/budget/${index}`).then(() => {
      navigate("/budget");
    });
  };
  return (
    <div className="accountDetails">
      <h1>Budget Details: </h1>
      <h4>
        Item Name: {listBudget.item_name}
        <br></br>
        Amount: {listBudget.amount}
        <br></br>
        Date: {listBudget.date}
        <br></br>
        From: {listBudget.from}
        <br></br>
        Catergory: {listBudget.catergory}
      </h4>

      <div className="backBtn">
        <Link to={`/budget`}>
          <button>Back</button>
        </Link>
      </div>
      <div className="editBtn">
        <Link to={`/budget/${index}/edit`}>
          <button>Edit</button>
        </Link>
      </div>
      <div className="deleteBtn">
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default BudgetDetails;
