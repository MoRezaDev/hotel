/*
  Warnings:

  - A unique constraint covering the columns `[mobileNumber]` on the table `Person` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codeNational]` on the table `Person` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[passportNumber]` on the table `Person` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `HotelFeatures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobileNumber` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'FAILED', 'SUCCESS');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MAN', 'WOMAN');

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Hotel" ADD COLUMN     "isSuggested" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "HotelFeatures" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "birthday" TIMESTAMP(3),
ADD COLUMN     "codeNational" INTEGER,
ADD COLUMN     "firstNameEn" TEXT,
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "lastNameEn" TEXT,
ADD COLUMN     "mobileNumber" INTEGER NOT NULL,
ADD COLUMN     "nationality" TEXT,
ADD COLUMN     "passportExpireDate" TIMESTAMP(3),
ADD COLUMN     "passportNumber" INTEGER;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "orderNumber" INTEGER NOT NULL,
    "extraRequest" TEXT,
    "passengerId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "codeNumber" INTEGER NOT NULL,
    "verifyCode" INTEGER,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "orderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Passenger" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "codeNational" INTEGER NOT NULL,
    "mobileNumber" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Passenger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PassengerToPerson" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PassengerToPerson_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_codeNumber_key" ON "Transaction"("codeNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_verifyCode_key" ON "Transaction"("verifyCode");

-- CreateIndex
CREATE UNIQUE INDEX "Passenger_codeNational_key" ON "Passenger"("codeNational");

-- CreateIndex
CREATE UNIQUE INDEX "Passenger_mobileNumber_key" ON "Passenger"("mobileNumber");

-- CreateIndex
CREATE INDEX "_PassengerToPerson_B_index" ON "_PassengerToPerson"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Person_mobileNumber_key" ON "Person"("mobileNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Person_codeNational_key" ON "Person"("codeNational");

-- CreateIndex
CREATE UNIQUE INDEX "Person_passportNumber_key" ON "Person"("passportNumber");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "Passenger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PassengerToPerson" ADD CONSTRAINT "_PassengerToPerson_A_fkey" FOREIGN KEY ("A") REFERENCES "Passenger"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PassengerToPerson" ADD CONSTRAINT "_PassengerToPerson_B_fkey" FOREIGN KEY ("B") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
