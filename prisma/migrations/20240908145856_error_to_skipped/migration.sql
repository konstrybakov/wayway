/*
  Warnings:

  - The values [Error] on the enum `ProofcheckWordStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProofcheckWordStatus_new" AS ENUM ('NotChecked', 'Skipped', 'Checked');
ALTER TABLE "words" ALTER COLUMN "proofcheckStatus" DROP DEFAULT;
ALTER TABLE "words" ALTER COLUMN "proofcheckStatus" TYPE "ProofcheckWordStatus_new" USING ("proofcheckStatus"::text::"ProofcheckWordStatus_new");
ALTER TYPE "ProofcheckWordStatus" RENAME TO "ProofcheckWordStatus_old";
ALTER TYPE "ProofcheckWordStatus_new" RENAME TO "ProofcheckWordStatus";
DROP TYPE "ProofcheckWordStatus_old";
ALTER TABLE "words" ALTER COLUMN "proofcheckStatus" SET DEFAULT 'NotChecked';
COMMIT;
