/*
  Warnings:

  - Added the required column `updatedAt` to the `Passenger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Passenger" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "discountPercent" INTEGER,
ALTER COLUMN "discountedPrice" DROP NOT NULL;
