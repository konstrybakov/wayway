/*
  Warnings:

  - You are about to drop the column `proofchecked` on the `words` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ProofcheckWordStatus" AS ENUM ('NotChecked', 'Error', 'Checked');

-- AlterTable
ALTER TABLE "words" ADD COLUMN "proofcheckStatus" "ProofcheckWordStatus" NOT NULL DEFAULT 'NotChecked';

UPDATE "words" SET "proofcheckStatus" = 'Checked' WHERE "proofchecked" = True;

ALTER TABLE "words" DROP COLUMN "proofchecked";
