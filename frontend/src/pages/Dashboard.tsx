import axios from "axios";

export default function Dashboard() {
  axios.get("http://localhost:5000/cards/userId", { withCredentials: true });
  return (
    <div className="container">
      <h1>Ma collection</h1>
      <p>Affichage des cartes Pokémon ici ...</p>
    </div>
  );
}
