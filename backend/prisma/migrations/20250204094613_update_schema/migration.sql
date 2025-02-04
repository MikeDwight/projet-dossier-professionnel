/*
  Warnings:

  - You are about to drop the column `series` on the `Card` table. All the data in the column will be lost.
  - Added the required column `bloc` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serie` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "series",
ADD COLUMN     "bloc" TEXT NOT NULL,
ADD COLUMN     "serie" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL;
