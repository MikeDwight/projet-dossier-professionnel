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
import { useState, useEffect } from "react";
import { addCard, updateCard } from "../services/cardService";
export default function CardForm({ initialData, cardId, onSuccess, onCancel, }) {
    const [formData, setFormData] = useState({
        name: "",
        number: 0,
        serie: "",
        bloc: "",
        imageUrl: "",
    });
    const [errorMessage, setErrorMessage] = useState(null);
    useEffect(() => {
        if (initialData)
            setFormData(initialData);
    }, [initialData]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => (Object.assign(Object.assign({}, prev), { [name]: name === "number" ? Number(value) : value })));
    };
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        try {
            cardId
                ? yield updateCard(cardId, Object.assign({ id: cardId }, formData))
                : yield addCard(formData);
            onSuccess();
        }
        catch (error) {
            setErrorMessage("Erreur lors de l'opération.");
        }
    });
    return (_jsxs("form", { onSubmit: handleSubmit, className: "card-form", children: [_jsx("h3", { children: cardId ? "Modifier une carte" : "Ajouter une carte" }), ["name", "number", "serie", "bloc", "imageUrl"].map((field) => (_jsx("input", { type: field === "number" ? "number" : "text", name: field, placeholder: field.charAt(0).toUpperCase() + field.slice(1), value: formData[field], onChange: handleChange, required: field !== "imageUrl" }, field))), errorMessage && _jsx("p", { className: "error-message", children: errorMessage }), _jsx("button", { type: "submit", children: cardId ? "Enregistrer" : "Ajouter" }), _jsx("button", { type: "button", onClick: onCancel, children: "Annuler" })] }));
}
