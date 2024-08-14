/*
  Warnings:

  - You are about to drop the column `wordId` on the `examples` table. All the data in the column will be lost.
  - Made the column `word_id` on table `examples` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "examples" DROP CONSTRAINT "examples_wordId_fkey";

-- AlterTable
ALTER TABLE "examples" DROP COLUMN "wordId",
ALTER COLUMN "word_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "examples" ADD CONSTRAINT "examples_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE;
