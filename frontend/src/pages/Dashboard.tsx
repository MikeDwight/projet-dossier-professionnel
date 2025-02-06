import { useEffect, useState } from "react";
import CardItem from "../components/CardItem";
import CardForm from "../components/CardForm";
import { fetchUserCards, deleteCard, Card } from "../services/cardService";
import "../styles/dashboard.css";
import "../styles/global.css";

export default function Dashboard() {
  const [cards, setCards] = useState<Card[]>([]);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    refreshCards();
  }, []);

  const refreshCards = async () => {
    const fetchedCards = await fetchUserCards();
    setCards(fetchedCards);
  };

  const handleDeleteCard = async (cardId: string) => {
    await deleteCard(cardId);
    refreshCards();
  };

  return (
    <div className="container">
      <header className="dashboard-header">
        <h2>Ma collection</h2>
        <div className="dashboard-actions">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="add-card-btn"
          >
            {showAddForm ? "Annuler" : "Ajouter"}
          </button>
        </div>
      </header>

      {showAddForm && (
        <CardForm
          onSuccess={refreshCards}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <div className="cards-grid">
        {cards.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            onEdit={() => setEditingCardId(card.id)}
            onDelete={() => handleDeleteCard(card.id)}
          />
        ))}
      </div>

      {editingCardId && (
        <CardForm
          cardId={editingCardId}
          initialData={cards.find((c) => c.id === editingCardId)}
          onSuccess={() => {
            setEditingCardId(null);
            refreshCards();
          }}
          onCancel={() => setEditingCardId(null)}
        />
      )}
    </div>
  );
}
