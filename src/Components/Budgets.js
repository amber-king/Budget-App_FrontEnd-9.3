//  TODO: http://localhost:3000/budgets -- shows the index of the transactions array via backend in the fetch


import React, { useState, useEffect } from "react";
import Budget from "./Budget";
import {useNavigate, useParams} from "react-router-dom"

function Budgets() {
  const [budgets, setBudgets] = useState([]);
  let {index} = useParams()
  let navigate = useNavigate()
  useEffect(() => {
    // fetch method
    fetch(`http://localhost:3333/transactions/${index}`)
      .then((res) => res.json())
      .then((data) => {
        setBudgets(data)
     
      })
      .catch(() => {
        navigate("/not-found")
      })
  }, [index, navigate]);

//   would set color according to each transaction value being under or over a certain amount
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
