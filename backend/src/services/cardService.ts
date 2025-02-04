import { PrismaClient } from "@prisma/client";

const prisma =
  process.env.NODE_ENV === "test"
    ? require("../../tests/__mocks__/prismaMock").default
    : new PrismaClient();

export default prisma;

export const createCardService = async (
  userId: string,
  name: string,
  number: number,
  serie: string,
  bloc: string,
  condition: string
) => {
  return await prisma.card.create({
    data: { userId, name, number, serie, bloc, condition },
  });
};

export const getCardsByUserService = async (userId: string) => {
  return await prisma.card.findMany({ where: { userId } });
};
