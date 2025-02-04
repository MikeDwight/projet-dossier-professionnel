import request from "supertest";
import app from "../src/index";
import prismaMock from "./__mocks__/prismaMock";
import bcrypt from "bcrypt";

describe("Auth Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("devrait inscrire un utilisateur", async () => {
    prismaMock.user.create.mockResolvedValue({
      id: "1",
      email: "test@example.com",
      password: "hashedpassword",
      firstname: "John",
      lastname: "Doe",
      createdAt: new Date(),
    });

    const res = await request(app).post("/auth/signup").send({
      email: "test@example.com",
      password: "password123",
      firstname: "John",
      lastname: "Doe",
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Utilisateur créé avec succès");
  });
  it("devrait connecter un utilisateur existant", async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: "1",
      email: "test@example.com",
      password: await bcrypt.hash("password123", 10),
      firstname: "John",
      lastname: "Doe",
      createdAt: new Date(),
    });

    const res = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
