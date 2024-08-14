/*
  Warnings:

  - A unique constraint covering the columns `[word_id]` on the table `word_progress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "word_progress_word_id_key" ON "word_progress"("word_id");
