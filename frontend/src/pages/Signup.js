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
import "../styles/signup.css";
export default function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        setError("");
        try {
            const response = yield fetch("http://localhost:5000/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                const data = yield response.json();
                throw new Error(data.error || "Erreur lors de l'inscription.");
            }
            navigate("/login");
        }
        catch (err) {
            setError(err.message);
        }
    });
    return (_jsxs("div", { className: "auth-container", children: [_jsx("h2", { children: "Inscription" }), error && _jsx("p", { className: "error-message", children: error }), _jsxs("form", { onSubmit: handleSubmit, children: [["firstname", "lastname", "email", "password"].map((field) => (_jsx("input", { type: field === "password" ? "password" : "text", name: field, placeholder: field.charAt(0).toUpperCase() + field.slice(1), value: formData[field], onChange: handleChange, required: true }, field))), _jsx("button", { type: "submit", children: "S'inscrire" })] })] }));
}
