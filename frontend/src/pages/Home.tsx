import { Link } from "react-router-dom";
import "../styles/home.css";
import "../styles/global.css";

export default function Home() {
  return (
    <div className="container">
      <h1>Bienvenue sur Pokémon collection</h1>
      <div className="container-btn">
        <Link to="/signup">Créer un compte</Link>
        <Link to="/login">Se connecter</Link>
      </div>
    </div>
  );
}
