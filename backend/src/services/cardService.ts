import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
