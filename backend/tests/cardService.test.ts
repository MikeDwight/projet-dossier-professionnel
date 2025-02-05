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
      userId: "1",
      imageUrl: "https://images.pokemontcg.io/base1/25.png",
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
        userId: "1",
        imageUrl: "https://images.pokemontcg.io/base1/25.png",
      },
      {
        id: "1",
        name: "Pikachu",
        number: 25,
        serie: "Base Set",
        bloc: "Wizards of the Coast",
        userId: "1",
        imageUrl: "https://images.pokemontcg.io/base1/25.png",
      },
    ]);

    const cards = await getCardsByUserService("1");

    expect(cards.length).toBe(2);
    expect(cards[0].name).toBe("Pikachu");
  });
});
