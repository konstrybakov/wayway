/*
  Warnings:

  - You are about to drop the column `performance` on the `practice_attempts` table. All the data in the column will be lost.
  - Added the required column `grade` to the `practice_attempts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "practice_attempts" DROP COLUMN "performance",
ADD COLUMN     "grade" INTEGER NOT NULL;
