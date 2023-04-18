import React, { useState, useEffect } from "react";
import Budget from "./Budget";

function Budgets() {
  const [budgets, setBudgets] = useState([]);
  //   const baseAPI = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // fetch method
    fetch(`${process.env.REACT_APP_API_URL}/budgets`)
      .then((res) => res.json())
      .then((data) => {
        setBudgets(data);
        console.log(setBudgets)
      })
      .catch((error) => console.log(error));
  }, []);

  const balanceChange = budgets.map((budget) => Number(budget.amount));
  let sumChange = 0;
  balanceChange.forEach((amt) => {
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
              <th>Date⤵️ </th>
              <th>Transactions⤵️ </th>
              <th>Amount⤵️ </th>
              <th>Catergory⤵️ </th>
              <th>From⤵️ </th>
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
