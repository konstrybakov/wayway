/*
  Warnings:

  - You are about to drop the column `word_id` on the `examples` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `words` table. All the data in the column will be lost.
  - You are about to drop the column `difficulty_category` on the `words` table. All the data in the column will be lost.
  - You are about to drop the column `frequency_category` on the `words` table. All the data in the column will be lost.
  - You are about to drop the column `pos` on the `words` table. All the data in the column will be lost.
  - You are about to drop the column `register_category` on the `words` table. All the data in the column will be lost.
  - You are about to drop the column `translation` on the `words` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[word_data_id]` on the table `examples` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[word_data_id]` on the table `words` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `word_data_id` to the `examples` table without a default value. This is not possible if the table is not empty.
  - Added the required column `word_data_id` to the `words` table without a default value. This is not possible if the table is not empty.

*/
-- WORD DATA MIGRATION ------------------------------------------------------------
-- CreateTable
CREATE TABLE "word_data" (
    "id" SERIAL NOT NULL,
    "translation" TEXT NOT NULL,
    "pos" TEXT,
    "description" TEXT,
    "frequency_category" "FrequencyCategory",
    "register_category" "RegisterCategory",
    "difficulty_category" "DifficultyCategory",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    "temp_word_id" INTEGER,

    CONSTRAINT "word_data_pkey" PRIMARY KEY ("id")
);

-- Insert data from words to word_data, and create a temp_word_id to keep the word_id from words
INSERT INTO "word_data" (
    "translation", "pos", "description", "frequency_category", "register_category", "difficulty_category", "created_at", "updated_at", "temp_word_id"
)
SELECT 
    "translation", "pos", "description", "frequency_category", "register_category", "difficulty_category", "created_at", "updated_at", "id"
FROM "words";

-- Add a word_data_id to the words table
ALTER TABLE "words" ADD COLUMN "word_data_id" INTEGER;
UPDATE "words" SET "word_data_id" = (
    SELECT "id" FROM "word_data" WHERE "word_data"."temp_word_id" = "words"."id"
);

ALTER TABLE "words" ALTER COLUMN "word_data_id" SET NOT NULL;
ALTER TABLE "word_data" DROP COLUMN "temp_word_id";

ALTER TABLE "words" DROP COLUMN "description",
DROP COLUMN "difficulty_category",
DROP COLUMN "frequency_category",
DROP COLUMN "pos",
DROP COLUMN "register_category",
DROP COLUMN "translation";

-- EXAMPLES MIGRATION ------------------------------------------------------------
-- DropForeignKey
ALTER TABLE "examples" DROP CONSTRAINT "examples_word_id_fkey";

-- AlterTable
ALTER TABLE "examples" ADD COLUMN "word_data_id" INTEGER;
UPDATE "examples" SET "word_data_id" = (
    SELECT "word_data_id" FROM "words" WHERE "words"."id" = "examples"."word_id"
);
ALTER TABLE "examples" ALTER COLUMN "word_data_id" SET NOT NULL;
ALTER TABLE "examples" DROP COLUMN "word_id";

-- PROOFCHECK RESULTS MIGRATION ------------------------------------------------------------
-- CreateTable
CREATE TABLE "proofcheck_results" (
    "id" SERIAL NOT NULL,
    "categories" TEXT[],
    "word_id" INTEGER NOT NULL,
    "word_data_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "proofcheck_results_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "proofcheck_results_word_id_key" ON "proofcheck_results"("word_id");

-- CreateIndex
CREATE UNIQUE INDEX "proofcheck_results_word_data_id_key" ON "proofcheck_results"("word_data_id");

-- CreateIndex
CREATE UNIQUE INDEX "words_word_data_id_key" ON "words"("word_data_id");

-- AddForeignKey
ALTER TABLE "words" ADD CONSTRAINT "words_word_data_id_fkey" FOREIGN KEY ("word_data_id") REFERENCES "word_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examples" ADD CONSTRAINT "examples_word_data_id_fkey" FOREIGN KEY ("word_data_id") REFERENCES "word_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proofcheck_results" ADD CONSTRAINT "proofcheck_results_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proofcheck_results" ADD CONSTRAINT "proofcheck_results_word_data_id_fkey" FOREIGN KEY ("word_data_id") REFERENCES "word_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;
