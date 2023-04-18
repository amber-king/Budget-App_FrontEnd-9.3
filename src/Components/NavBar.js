import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>

      <h1>
        <Link to="/">Home🪴</Link> | <Link to="/budgets">Budgets💸</Link>
      </h1>
      <button>
        <Link to="/budgets/new">New Budget🤑</Link>
      </button>
    </nav>
  );
}