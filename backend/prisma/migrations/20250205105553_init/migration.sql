/*
  Warnings:

  - You are about to drop the column `condition` on the `Card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "condition",
ADD COLUMN     "imageUrl" TEXT;
