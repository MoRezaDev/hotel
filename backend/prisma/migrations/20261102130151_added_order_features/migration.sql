/*
  Warnings:

  - Added the required column `checkIn` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkOut` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "checkIn" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "checkOut" TIMESTAMP(3) NOT NULL;
