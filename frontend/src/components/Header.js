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
import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";
export default function Header() {
    const navigate = useNavigate();
    const handleLogout = () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield fetch("http://localhost:5000/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            navigate("/login");
        }
        catch (error) {
            console.error("Erreur lors de la déconnexion", error);
        }
    });
    return (_jsxs("header", { className: "header", children: [_jsx("div", { className: "logo", children: "Pok\u00E9mon Collection" }), _jsx("nav", { children: _jsxs("ul", { children: [_jsx("li", { children: _jsx(Link, { to: "/", children: "Accueil" }) }), _jsx("li", { children: _jsx(Link, { to: "/dashboard", children: "Dashboard" }) }), _jsx("li", { children: _jsx(Link, { to: "/login", children: "Connexion" }) }), _jsx("li", { children: _jsx(Link, { to: "/signup", children: "Inscription" }) }), _jsx("li", { children: _jsx("button", { onClick: handleLogout, className: "logout-btn", children: "D\u00E9connexion" }) })] }) })] }));
}
