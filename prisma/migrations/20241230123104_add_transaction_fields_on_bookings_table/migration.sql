/*
  Warnings:

  - Added the required column `amount` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isIncome` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "isIncome" BOOLEAN NOT NULL;
