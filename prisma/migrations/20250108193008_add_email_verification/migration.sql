/*
  Warnings:

  - You are about to drop the column `firstname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstname",
DROP COLUMN "name",
ADD COLUMN     "emailVerificationToken" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastName" TEXT;
