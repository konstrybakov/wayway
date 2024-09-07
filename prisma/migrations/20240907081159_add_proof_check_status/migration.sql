-- CreateEnum
CREATE TYPE "ProofcheckStatus" AS ENUM ('Pending', 'Accepted', 'Rejected', 'PartiallyAccepted');

-- AlterTable
ALTER TABLE "proofcheck_results" ADD COLUMN     "status" "ProofcheckStatus" NOT NULL DEFAULT 'Pending';
