import { useEffect, useState } from "react";
import CardItem from "../components/CardItem";
import CardForm from "../components/CardForm";
import { fetchUserCards, deleteCard, Card } from "../services/cardService";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const refreshCards = async () => {
    const fetchedCards = await fetchUserCards();
    setCards(fetchedCards);
  };

  useEffect(() => {
    refreshCards();
  }, []);

  const handleDelete = async (cardId: string) => {
    await deleteCard(cardId);
    refreshCards();
  };

  return (
    <div className="dashboard-container">
      <h2>Ma collection de cartes Pokémon</h2>
      <button
        onClick={() => {
          setIsFormVisible(true);
          setSelectedCard(null);
        }}
      >
        {isFormVisible ? "Annuler" : "Ajouter une carte"}
      </button>

      {isFormVisible && (
        <CardForm
          initialData={selectedCard || undefined}
          cardId={selectedCard?.id}
          onSuccess={() => {
            refreshCards();
            setIsFormVisible(false);
          }}
          onCancel={() => setIsFormVisible(false)}
        />
      )}

      <div className="cards-grid">
        {cards.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            onEdit={() => {
              setSelectedCard(card);
              setIsFormVisible(true);
            }}
            onDelete={() => handleDelete(card.id)}
          />
        ))}
      </div>
    </div>
  );
}
