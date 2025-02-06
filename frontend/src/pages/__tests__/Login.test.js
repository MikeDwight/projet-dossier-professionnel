var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../Login";
import { BrowserRouter } from "react-router-dom";
// Mock de `fetch`
global.fetch = jest.fn(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: "Connexion réussie" }),
}));
describe("Login Page", () => {
    it("affiche un message de succès après une connexion réussie", () => __awaiter(void 0, void 0, void 0, function* () {
        render(_jsx(BrowserRouter, { children: _jsx(Login, {}) }));
        fireEvent.change(screen.getByPlaceholderText("Email"), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("Mot de passe"), {
            target: { value: "password123" },
        });
        fireEvent.click(screen.getByText("Se connecter"));
        yield waitFor(() => {
            expect(screen.getByText("Connexion réussie")).toBeInTheDocument();
        });
    }));
});
