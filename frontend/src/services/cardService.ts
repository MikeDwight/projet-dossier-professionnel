export interface Card {
  id: string;
  name: string;
  number: number;
  serie: string;
  bloc: string;
  imageUrl: string;
}

const API_URL = "http://localhost:5000/cards";

export const fetchUserCards = async (): Promise<Card[]> => {
  const response = await fetch(`${API_URL}/userId`, { credentials: "include" });
  return response.json();
};

export const addCard = async (newCard: Omit<Card, "id">) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(newCard),
  });

  if (!response.ok) throw new Error("Erreur lors de l'ajout de la carte.");
  return response.json();
};

export const deleteCard = async (cardId: string) => {
  const response = await fetch(`${API_URL}/${cardId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok)
    throw new Error("Erreur lors de la suppression de la carte.");
};

export const updateCard = async (cardId: string, updatedCard: Card) => {
  const response = await fetch(`${API_URL}/${cardId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(updatedCard),
  });

  if (!response.ok)
    throw new Error("Erreur lors de la modification de la carte.");
};
