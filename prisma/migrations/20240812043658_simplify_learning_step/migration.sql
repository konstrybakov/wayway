/*
  Warnings:

  - The `learning_step` column on the `word_progress` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "word_progress" DROP COLUMN "learning_step",
ADD COLUMN     "learning_step" INTEGER NOT NULL DEFAULT 0;

-- DropEnum
DROP TYPE "LearningStep";
