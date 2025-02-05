import request from "supertest";
import app from "../src/index";
import prismaMock from "./__mocks__/prismaMock";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

const token = jwt.sign({ id: 1, email: "test@example.com" }, JWT_SECRET, {
  expiresIn: "1h",
});

describe("Card Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("devrait ajouter une carte Pokémon à l'utilisateur", async () => {
    prismaMock.card.create.mockResolvedValue({
      id: "1",
      name: "Pikachu",
      number: 25,
      serie: "Set de base",
      bloc: "1iere édition",
      userId: "1",
      imageUrl: "https://images.pokemontcg.io/base1/25.png",
    });

    const res = await request(app)
      .post("/cards")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: "1",
        name: "Pikachu",
        number: 25,
        serie: "Set de base",
        bloc: "1iere édition",
        userId: "1",
        imageUrl: "https://images.pokemontcg.io/base1/25.png",
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Carte ajoutée avec succès");
  });

  it("devrait récupérer toutes les cartes de l'utilisateur", async () => {
    prismaMock.card.findMany.mockResolvedValue([
      {
        id: "1",
        name: "Pikachu",
        number: 25,
        serie: "Set de base",
        bloc: "1iere édition",
        userId: "1",
        imageUrl: "https://images.pokemontcg.io/base1/25.png",
      },
    ]);

    const res = await request(app)
      .get("/cards/:userId")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
