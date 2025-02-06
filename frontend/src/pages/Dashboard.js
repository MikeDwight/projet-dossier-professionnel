var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import CardItem from "../components/CardItem";
import CardForm from "../components/CardForm";
import { fetchUserCards, deleteCard } from "../services/cardService";
import "../styles/dashboard.css";
export default function Dashboard() {
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const refreshCards = () => __awaiter(this, void 0, void 0, function* () {
        const fetchedCards = yield fetchUserCards();
        setCards(fetchedCards);
    });
    useEffect(() => {
        refreshCards();
    }, []);
    const handleDelete = (cardId) => __awaiter(this, void 0, void 0, function* () {
        yield deleteCard(cardId);
        refreshCards();
    });
    return (_jsxs("div", { className: "dashboard-container", children: [_jsx("h2", { children: "Ma collection de cartes Pok\u00E9mon" }), _jsx("button", { onClick: () => {
                    setIsFormVisible(true);
                    setSelectedCard(null);
                }, children: isFormVisible ? "Annuler" : "Ajouter une carte" }), isFormVisible && (_jsx(CardForm, { initialData: selectedCard || undefined, cardId: selectedCard === null || selectedCard === void 0 ? void 0 : selectedCard.id, onSuccess: () => {
                    refreshCards();
                    setIsFormVisible(false);
                }, onCancel: () => setIsFormVisible(false) })), _jsx("div", { className: "cards-grid", children: cards.map((card) => (_jsx(CardItem, { card: card, onEdit: () => {
                        setSelectedCard(card);
                        setIsFormVisible(true);
                    }, onDelete: () => handleDelete(card.id) }, card.id))) })] }));
}
