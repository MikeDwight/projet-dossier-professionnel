import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

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
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Déconnexion
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
