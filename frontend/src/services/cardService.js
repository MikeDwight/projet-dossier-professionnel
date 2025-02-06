var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
const API_URL = "http://localhost:5000/cards";
export const fetchUserCards = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_URL}/userId`, {
      credentials: "include",
    });
    return response.json();
  });
export const addCard = (newCard) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(newCard),
    });
    if (!response.ok) throw new Error("Erreur lors de l'ajout de la carte.");
    return response.json();
  });
export const deleteCard = (cardId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_URL}/${cardId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok)
      throw new Error("Erreur lors de la suppression de la carte.");
  });
export const updateCard = (cardId, updatedCard) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_URL}/${cardId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(updatedCard),
    });
    if (!response.ok)
      throw new Error("Erreur lors de la modification de la carte.");
  });
