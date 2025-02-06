import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function CardItem({ card, onEdit, onDelete }) {
    return (_jsxs("div", { className: "card", children: [_jsx("h3", { children: card.name }), _jsxs("p", { children: ["Num\u00E9ro: ", card.number] }), _jsxs("p", { children: ["S\u00E9rie: ", card.serie] }), _jsxs("p", { children: ["Bloc: ", card.bloc] }), _jsx("img", { src: card.imageUrl, alt: card.name }), _jsx("button", { onClick: onEdit, children: "Modifier" }), _jsx("button", { onClick: onDelete, children: "Supprimer" })] }));
}
