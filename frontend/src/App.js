import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./App.css";
import AppRouter from "./router";
import Header from "./components/Header";
import Footer from "./components/Footer";
function App() {
    return (_jsxs("div", { className: "app", children: [_jsx(Header, {}), _jsx("main", { children: _jsx(AppRouter, {}) }), _jsx(Footer, {})] }));
}
export default App;
