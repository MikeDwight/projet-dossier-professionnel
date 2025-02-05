import { useEffect, useState } from "react";

interface Card {
  id: string;
  name: string;
  number: number;
  serie: string;
  bloc: string;
  imageUrl: string;
}

export default function Dashboard() {
  const [cards, setCards] = useState<Card[]>([]);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editedCard, setEditedCard] = useState<Card | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState<Omit<Card, "id">>({
    name: "",
    number: 0,
    serie: "",
    bloc: "",
    imageUrl: "",
  });

  // Récupérer les cartes au chargement
  useEffect(() => {
    fetch("http://localhost:5000/cards/userId", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setCards(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération :", error)
      );
  }, []);

  // Ajouter une carte
  const handleAddCard = async () => {
    try {
      const response = await fetch("http://localhost:5000/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newCard),
      });

      if (response.ok) {
        const updatedResponse = await fetch(
          "http://localhost:5000/cards/userId",
          { credentials: "include" }
        );
        const updatedCards = await updatedResponse.json();
        setCards(updatedCards);

        setShowAddForm(false);
        setNewCard({
          name: "",
          number: 0,
          serie: "",
          bloc: "",
          imageUrl: "",
        });
      } else {
        console.error("Erreur lors de l'ajout de la carte.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  // Supprimer une carte
  const handleDeleteCard = async (cardId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/cards/${cardId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
      } else {
        console.error("Erreur lors de la suppression de la carte.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  // Modifier une carte
  const handleUpdateCard = async (cardId: string) => {
    if (!editedCard) return;

    try {
      const response = await fetch(`http://localhost:5000/cards/${cardId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(editedCard),
      });

      if (response.ok) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === cardId ? { ...editedCard, id: cardId } : card
          )
        );
        setEditingCardId(null);
      } else {
        console.error("Erreur lors de la modification de la carte.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  return (
    <div className="dashboard">
      <h2>Ma collection de cartes</h2>

      {/* Bouton Ajouter une carte */}
      <button onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? "Annuler" : "Ajouter une carte"}
      </button>

      {/* Formulaire d'ajout de carte */}
      {showAddForm && (
        <div className="add-card-form">
          <h3>Nouvelle carte</h3>

          <label>Nom :</label>
          <input
            type="text"
            value={newCard.name}
            onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
          />

          <label>Numéro :</label>
          <input
            type="number"
            value={newCard.number}
            onChange={(e) =>
              setNewCard({ ...newCard, number: Number(e.target.value) })
            }
          />

          <label>Série :</label>
          <input
            type="text"
            value={newCard.serie}
            onChange={(e) => setNewCard({ ...newCard, serie: e.target.value })}
          />

          <label>Bloc :</label>
          <input
            type="text"
            value={newCard.bloc}
            onChange={(e) => setNewCard({ ...newCard, bloc: e.target.value })}
          />

          <label>Image URL :</label>
          <input
            type="text"
            value={newCard.imageUrl}
            onChange={(e) =>
              setNewCard({ ...newCard, imageUrl: e.target.value })
            }
          />

          {/* Boutons */}
          <button onClick={handleAddCard}>Ajouter</button>
        </div>
      )}

      <div className="cards-container">
        {cards.map((card, index) => (
          <div key={card.id || `temp-${index}`} className="card">
            <h3>{card.name}</h3>
            <p>Numéro: {card.number}</p>
            <p>Série: {card.serie}</p>
            <p>Bloc: {card.bloc}</p>
            <img src={card.imageUrl} alt={card.name} />

            {/* Bouton Modifier */}
            <button
              onClick={() => {
                setEditingCardId(card.id);
                setEditedCard({ ...card });
              }}
            >
              Modifier
            </button>
            <button onClick={() => handleDeleteCard(card.id)}>Supprimer</button>

            {/* Formulaire de modification */}
            {editingCardId === card.id && editedCard && (
              <div className="edit-card-modal">
                <h3>Modifier la carte</h3>

                <label>Nom :</label>
                <input
                  type="text"
                  value={editedCard.name}
                  onChange={(e) =>
                    setEditedCard({ ...editedCard, name: e.target.value })
                  }
                />

                <label>Numéro :</label>
                <input
                  type="number"
                  value={editedCard.number}
                  onChange={(e) =>
                    setEditedCard({
                      ...editedCard,
                      number: Number(e.target.value),
                    })
                  }
                />

                <label>Série :</label>
                <input
                  type="text"
                  value={editedCard.serie}
                  onChange={(e) =>
                    setEditedCard({ ...editedCard, serie: e.target.value })
                  }
                />

                <label>Bloc :</label>
                <input
                  type="text"
                  value={editedCard.bloc}
                  onChange={(e) =>
                    setEditedCard({ ...editedCard, bloc: e.target.value })
                  }
                />

                <button onClick={() => handleUpdateCard(card.id)}>
                  Enregistrer
                </button>
                <button onClick={() => setEditingCardId(null)}>Annuler</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
