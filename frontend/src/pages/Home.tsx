import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <h1>Bienvenue sur Pokémon collection</h1>
      <Link to="/signup">Créer un compte</Link>
      <Link to="/login">Se connecter</Link>
    </div>
  );
}
