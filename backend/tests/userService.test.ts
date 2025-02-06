import {
  createUserService,
  getUserByEmailService,
} from "../src/services/userService";
import prismaMock from "./__mocks__/prismaMock";

describe("User Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("devrait créer un utilisateur", async () => {
    prismaMock.user.create.mockResolvedValue({
      id: "1",
      email: "test@example.com",
      password: "password1A*",
      firstname: "John",
      lastname: "Doe",
      createdAt: new Date(),
    });

    const user = await createUserService(
      "test@example.com",
      "password1A*",
      "John",
      "Doe"
    );

    expect(user).toHaveProperty("id");
    expect(user.email).toBe("test@example.com");
  });

  it("devrait récupérer un utilisateur par email", async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: "1",
      email: "test@example.com",
      password: "password1A*",
      firstname: "John",
      lastname: "Doe",
      createdAt: new Date(),
    });

    const user = await getUserByEmailService("test@example.com");

    expect(user).toBeDefined();
    expect(user?.email).toBe("test@example.com");
  });
});
