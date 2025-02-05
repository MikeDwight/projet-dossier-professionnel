import { useState } from "react";

export default function AddCardForm({
  onCardAdded,
}: {
  onCardAdded: () => void;
}) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [serie, setSerie] = useState("");
  const [bloc, setBloc] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newCard = { name, number: Number(number), serie, bloc, imageUrl };

    try {
      const response = await fetch("http://localhost:5000/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newCard),
      });

      if (response.ok) {
        onCardAdded();
        setName("");
        setNumber("");
        setSerie("");
        setBloc("");
        setImageUrl("");
      } else {
        console.error("Erreur lors de l'ajout de la carte.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nom"
        required
      />
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Numéro"
        required
      />
      <input
        type="text"
        value={serie}
        onChange={(e) => setSerie(e.target.value)}
        placeholder="Série"
        required
      />
      <input
        type="text"
        value={bloc}
        onChange={(e) => setBloc(e.target.value)}
        placeholder="Bloc"
        required
      />
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL (facultatif)"
      />
      <button type="submit">Ajouter la carte</button>
    </form>
  );
}
