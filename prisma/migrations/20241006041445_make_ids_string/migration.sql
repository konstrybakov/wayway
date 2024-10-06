/*
  Warnings:

  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `examples` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `practice_attempts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `word_progress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `words` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `practice_session_id` on table `practice_attempts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToWord" DROP CONSTRAINT "_CategoryToWord_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToWord" DROP CONSTRAINT "_CategoryToWord_B_fkey";

-- DropForeignKey
ALTER TABLE "examples" DROP CONSTRAINT "examples_word_id_fkey";

-- DropForeignKey
ALTER TABLE "practice_attempts" DROP CONSTRAINT "practice_attempts_practice_session_id_fkey";

-- DropForeignKey
ALTER TABLE "practice_attempts" DROP CONSTRAINT "practice_attempts_word_id_fkey";

-- DropForeignKey
ALTER TABLE "practice_attempts" DROP CONSTRAINT "practice_attempts_word_progress_id_fkey";

-- DropForeignKey
ALTER TABLE "word_progress" DROP CONSTRAINT "word_progress_word_id_fkey";

-- AlterTable
ALTER TABLE "PracticeSession" ALTER COLUMN "words" SET DATA TYPE TEXT[];

-- AlterTable
ALTER TABLE "_CategoryToWord" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "categories" DROP CONSTRAINT "categories_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "categories_id_seq";

-- AlterTable
ALTER TABLE "examples" DROP CONSTRAINT "examples_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "word_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "examples_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "examples_id_seq";

-- AlterTable
ALTER TABLE "practice_attempts" DROP CONSTRAINT "practice_attempts_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "word_progress_id" SET DATA TYPE TEXT,
ALTER COLUMN "word_id" SET DATA TYPE TEXT,
ALTER COLUMN "practice_session_id" SET NOT NULL,
ADD CONSTRAINT "practice_attempts_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "practice_attempts_id_seq";

-- AlterTable
ALTER TABLE "word_progress" DROP CONSTRAINT "word_progress_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "word_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "word_progress_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "word_progress_id_seq";

-- AlterTable
ALTER TABLE "words" DROP CONSTRAINT "words_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "words_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "words_id_seq";

-- AddForeignKey
ALTER TABLE "examples" ADD CONSTRAINT "examples_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "word_progress" ADD CONSTRAINT "word_progress_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_attempts" ADD CONSTRAINT "practice_attempts_word_progress_id_fkey" FOREIGN KEY ("word_progress_id") REFERENCES "word_progress"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_attempts" ADD CONSTRAINT "practice_attempts_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_attempts" ADD CONSTRAINT "practice_attempts_practice_session_id_fkey" FOREIGN KEY ("practice_session_id") REFERENCES "PracticeSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToWord" ADD CONSTRAINT "_CategoryToWord_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToWord" ADD CONSTRAINT "_CategoryToWord_B_fkey" FOREIGN KEY ("B") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE;
