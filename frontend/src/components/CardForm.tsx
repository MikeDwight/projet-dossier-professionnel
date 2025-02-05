import { useState } from "react";
import { Card, addCard, updateCard } from "../services/cardService";

interface CardFormProps {
  initialData?: Omit<Card, "id">;
  cardId?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function CardForm({
  initialData,
  cardId,
  onSuccess,
  onCancel,
}: CardFormProps) {
  const [formData, setFormData] = useState<Omit<Card, "id">>(
    initialData || { name: "", number: 0, serie: "", bloc: "", imageUrl: "" }
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      if (cardId) {
        await updateCard(cardId, { id: cardId, ...formData });
      } else {
        await addCard(formData);
      }
      onSuccess();
    } catch (error) {
      setErrorMessage("Erreur lors de l'opération.");
    }
  };

  return (
    <div className="card-form">
      <label>Nom :</label>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <label>Numéro :</label>
      <input
        type="number"
        value={formData.number}
        onChange={(e) =>
          setFormData({ ...formData, number: Number(e.target.value) })
        }
      />

      <label>Série :</label>
      <input
        type="text"
        value={formData.serie}
        onChange={(e) => setFormData({ ...formData, serie: e.target.value })}
      />

      <label>Bloc :</label>
      <input
        type="text"
        value={formData.bloc}
        onChange={(e) => setFormData({ ...formData, bloc: e.target.value })}
      />

      <label>Image URL :</label>
      <input
        type="text"
        value={formData.imageUrl}
        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
      />

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button onClick={handleSubmit}>{cardId ? "Modifier" : "Ajouter"}</button>
      <button onClick={onCancel}>Annuler</button>
    </div>
  );
}
