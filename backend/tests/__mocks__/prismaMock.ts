import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import { PrismaClient } from "@prisma/client";

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => mockDeep<PrismaClient>()),
}));

const prismaMock = new PrismaClient() as DeepMockProxy<PrismaClient>;

export default prismaMock;
