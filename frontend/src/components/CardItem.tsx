import { Card } from "../services/cardService";

interface CardItemProps {
  card: Card;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CardItem({ card, onEdit, onDelete }: CardItemProps) {
  return (
    <div className="card">
      <h3>{card.name}</h3>
      <p>Numéro: {card.number}</p>
      <p>Série: {card.serie}</p>
      <p>Bloc: {card.bloc}</p>
      <img src={card.imageUrl} alt={card.name} />

      <button onClick={onEdit}>Modifier</button>
      <button onClick={onDelete}>Supprimer</button>
    </div>
  );
}
