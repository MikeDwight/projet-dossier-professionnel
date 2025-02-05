import { Link } from "react-router-dom";
import "../styles/header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">Pokémon Collection</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/login">Connexion</Link>
          </li>
          <li>
            <Link to="/signup">Inscription</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
