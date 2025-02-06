import { useState, useEffect } from "react";
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
  const [formData, setFormData] = useState<Omit<Card, "id">>({
    name: "",
    number: 0,
    serie: "",
    bloc: "",
    imageUrl: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      cardId
        ? await updateCard(cardId, { id: cardId, ...formData })
        : await addCard(formData);
      onSuccess();
    } catch (error) {
      setErrorMessage("Erreur lors de l'opération.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-form">
      <h3>{cardId ? "Modifier une carte" : "Ajouter une carte"}</h3>
      {["name", "number", "serie", "bloc", "imageUrl"].map((field) => (
        <input
          key={field}
          type={field === "number" ? "number" : "text"}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formData[field as keyof Omit<Card, "id">] as string | number}
          onChange={handleChange}
          required={field !== "imageUrl"}
        />
      ))}

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button type="submit">{cardId ? "Enregistrer" : "Ajouter"}</button>
      <button type="button" onClick={onCancel}>
        Annuler
      </button>
    </form>
  );
}
