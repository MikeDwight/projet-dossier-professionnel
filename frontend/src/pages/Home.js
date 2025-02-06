import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import "../styles/home.css";
import "../styles/global.css";
export default function Home() {
    return (_jsxs("div", { className: "container", children: [_jsx("h1", { children: "Bienvenue sur Pok\u00E9mon collection" }), _jsxs("div", { className: "container-btn", children: [_jsx(Link, { to: "/signup", children: "Cr\u00E9er un compte" }), _jsx(Link, { to: "/login", children: "Se connecter" })] })] }));
}
