/*
  Warnings:

  - Added the required column `entryDate` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exitDate` to the `Hotel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hotel" ADD COLUMN     "entryDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "exitDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Person" ALTER COLUMN "mobileNumber" SET DATA TYPE TEXT;
