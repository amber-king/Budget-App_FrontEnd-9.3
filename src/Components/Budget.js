// http://localhost:3000/budget -> Connets to Budgets.js with links to each part of transaction

import React from 'react'
import { Link } from "react-router-dom";

function Budget({ budget, index }) {

return (
    <tr>
      <td>
      {budget.date}
      </td>
      <td>
       <Link to={`/budgets/${index}`}>{budget.item_name}</Link>
      </td>
      <td>
        <Link to={`/budgets/${index}`}>{budget.amount}</Link>
      </td>
      <td>
        <Link to={`/budgets/${index}`}>{budget.from}</Link>
      </td>
      <td>
        <Link to={`/budgets/${index}`}>{budget.category}</Link>
      </td>
    </tr>
  );
}

export default Budget;
