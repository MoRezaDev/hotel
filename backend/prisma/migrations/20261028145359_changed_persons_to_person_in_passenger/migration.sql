/*
  Warnings:

  - You are about to drop the `_PassengerToPerson` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `personId` to the `Passenger` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_PassengerToPerson" DROP CONSTRAINT "_PassengerToPerson_A_fkey";

-- DropForeignKey
ALTER TABLE "_PassengerToPerson" DROP CONSTRAINT "_PassengerToPerson_B_fkey";

-- AlterTable
ALTER TABLE "Passenger" ADD COLUMN     "personId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_PassengerToPerson";

-- AddForeignKey
ALTER TABLE "Passenger" ADD CONSTRAINT "Passenger_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
