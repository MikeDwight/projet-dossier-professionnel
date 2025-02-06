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
  imageUrl: string
) => {
  return await prisma.card.create({
    data: { userId, name, number, serie, bloc, imageUrl },
  });
};

export const getCardsByUserService = async (userId: string) => {
  return await prisma.card.findMany({ where: { userId } });
};

export const deleteCardService = async (cardId: string) => {
  return await prisma.card.delete({
    where: { id: cardId },
  });
};

export const updateCardService = async (
  cardId: string,
  name: string,
  number: number,
  serie: string,
  bloc: string,
  imageUrl: string
) => {
  return await prisma.card.update({
    where: { id: cardId },
    data: { name, number, serie, bloc, imageUrl },
  });
};
