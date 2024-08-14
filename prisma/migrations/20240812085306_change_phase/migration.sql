/*
  Warnings:

  - You are about to drop the column `practiceSessionId` on the `practice_attempts` table. All the data in the column will be lost.
  - You are about to drop the column `review_type` on the `practice_attempts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "practice_attempts" DROP CONSTRAINT "practice_attempts_practiceSessionId_fkey";

-- AlterTable
ALTER TABLE "practice_attempts" DROP COLUMN "practiceSessionId",
DROP COLUMN "review_type",
ADD COLUMN     "phase" "Phase" NOT NULL DEFAULT 'Learning',
ADD COLUMN     "practice_session_id" TEXT;

-- DropEnum
DROP TYPE "ReviewType";

-- AddForeignKey
ALTER TABLE "practice_attempts" ADD CONSTRAINT "practice_attempts_practice_session_id_fkey" FOREIGN KEY ("practice_session_id") REFERENCES "PracticeSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;
