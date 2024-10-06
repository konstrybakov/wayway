/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PracticeSession" DROP CONSTRAINT "PracticeSession_user_id_fkey";

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_user_id_fkey";

-- DropForeignKey
ALTER TABLE "practice_attempts" DROP CONSTRAINT "practice_attempts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "word_progress" DROP CONSTRAINT "word_progress_user_id_fkey";

-- DropForeignKey
ALTER TABLE "words" DROP CONSTRAINT "words_user_id_fkey";

-- DropTable
DROP TABLE "users";
