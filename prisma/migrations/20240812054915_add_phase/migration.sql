/*
  Warnings:

  - You are about to drop the column `is_in_learning` on the `word_progress` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Phase" AS ENUM ('Learning', 'Review', 'Relearning');

-- AlterTable
ALTER TABLE "word_progress" DROP COLUMN "is_in_learning",
ADD COLUMN     "phase" "Phase" NOT NULL DEFAULT 'Learning';
