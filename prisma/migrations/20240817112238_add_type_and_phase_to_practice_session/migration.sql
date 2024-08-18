-- CreateEnum
CREATE TYPE "PracticeSessionType" AS ENUM ('New', 'Review');

-- AlterTable
ALTER TABLE "PracticeSession" ADD COLUMN     "phase" "Phase"[],
ADD COLUMN     "practiceType" "PracticeSessionType"[];
