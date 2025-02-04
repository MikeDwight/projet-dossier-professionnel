import {
  createCardService,
  getCardsByUserService,
} from "../src/services/cardService";
import prismaMock from "./__mocks__/prismaMock";

describe("Card Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("devrait ajouter une carte Pokémon à l'utilisateur", async () => {
    prismaMock.card.create.mockResolvedValue({
      id: "1",
      name: "Pikachu",
      number: 25,
      serie: "Base Set",
      bloc: "Wizards of the Coast",
      condition: "Near Mint",
      userId: "1",
    });

    const card = await createCardService(
      "1",
      "Pikachu",
      25,
      "Base Set",
      "Wizards of the Coast",
      "Near Mint"
    );

    expect(card).toHaveProperty("id");
    expect(card.name).toBe("Pikachu");
  });

  it("devrait récupérer toutes les cartes d'un utilisateur", async () => {
    prismaMock.card.findMany.mockResolvedValue([
      {
        id: "1",
        name: "Pikachu",
        number: 25,
        serie: "Base Set",
        bloc: "Wizards of the Coast",
        condition: "Near Mint",
        userId: "1",
      },
      {
        id: "2",
        name: "Charizard",
        number: 6,
        serie: "Base Set",
        bloc: "Wizards of the Coast",
        condition: "Mint",
        userId: "1",
      },
    ]);

    const cards = await getCardsByUserService("1");

    expect(cards.length).toBe(2);
    expect(cards[0].name).toBe("Pikachu");
    expect(cards[1].name).toBe("Charizard");
  });
});
