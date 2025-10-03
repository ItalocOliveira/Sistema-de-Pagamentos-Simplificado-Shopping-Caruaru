/*
  Warnings:

  - You are about to alter the column `balance` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "public"."Account" ALTER COLUMN "balance" SET DEFAULT 0.0,
ALTER COLUMN "balance" SET DATA TYPE DECIMAL(10,2);
