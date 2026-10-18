/*
  Warnings:

  - You are about to drop the column `entryDate` on the `Hotel` table. All the data in the column will be lost.
  - You are about to drop the column `exitDate` on the `Hotel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "entryDate",
DROP COLUMN "exitDate",
ADD COLUMN     "rating" DOUBLE PRECISION;
