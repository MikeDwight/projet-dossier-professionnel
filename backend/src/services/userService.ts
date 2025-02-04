import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma =
  process.env.NODE_ENV === "test"
    ? require("../../tests/__mocks__/prismaMock").default
    : new PrismaClient();

export default prisma;

export const createUserService = async (
  email: string,
  password: string,
  firstname: string,
  lastname: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: { email, password: hashedPassword, firstname, lastname },
  });
};

export const getUserByEmailService = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};
