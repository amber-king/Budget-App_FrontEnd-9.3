import { useState, useEffect } from "react";
// import axios from "axios";
import Budget from "./Budget";

function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const baseAPI = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // fetch method
    fetch(`${baseAPI}/budgets`)
      .then((res) => res.json())
      .then((data) => {
        setBudgets(data);
      })
      .catch((error) => console.log(error));
  }, [baseAPI]);

  const balanceChange = budgets.map((budget) => Number(budget.amount));
  let sumChange = 0;
  budgets.forEach((amt) => {
    sumChange += amt;
    return sumChange;
  });
  let amtColor = "";
  if (sumChange < 0) {
    amtColor = "red";
  } else {
    amtColor = "green";
  }

  return (
    <div className="Budgets">
      <h2>
        Bank Account Total:
        <span className={amtColor}>{sumChange}</span>
      </h2>
      <section>
        <table>
          <thead>
            <tr>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((budget, index) => {
              return <Budget key={index} budget={budget} index={index} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Budgets;
