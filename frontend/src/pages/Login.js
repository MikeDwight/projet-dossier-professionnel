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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        if (!formData.email || !formData.password) {
            setError("Veuillez remplir tous les champs");
            return;
        }
        try {
            const response = yield fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                const data = yield response.json();
                throw new Error(data.error || "Email ou mot de passe incorrect.");
            }
            const data = yield response.json();
            setSuccessMessage(data.message || "Connexion réussie");
            navigate("/dashboard");
        }
        catch (err) {
            setError(err.message);
        }
    });
    return (_jsxs("div", { className: "auth-container", children: [_jsx("h2", { children: "Connexion" }), error && _jsx("p", { className: "error-message", children: error }), successMessage && _jsx("p", { className: "success-message", children: successMessage }), _jsxs("form", { onSubmit: handleSubmit, children: [["email", "password"].map((field) => (_jsx("input", { type: field === "password" ? "password" : "email", name: field, placeholder: field === "email" ? "Email" : "Mot de passe", value: formData[field], onChange: handleChange }, field))), _jsx("button", { type: "submit", children: "Se connecter" })] })] }));
}
