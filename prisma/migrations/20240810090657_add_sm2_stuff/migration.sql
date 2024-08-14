-- CreateEnum
CREATE TYPE "Algorithm" AS ENUM ('SM2');

-- CreateEnum
CREATE TYPE "LearningStep" AS ENUM ('1', '10', '1440', '4320');

-- CreateEnum
CREATE TYPE "ReviewType" AS ENUM ('Learning', 'Review', 'Relearning');

-- CreateEnum
CREATE TYPE "ReviewMethod" AS ENUM ('FullTyping');

-- AlterTable
ALTER TABLE "examples" ADD COLUMN     "word_id" INTEGER;

-- CreateTable
CREATE TABLE "word_progress" (
    "id" SERIAL NOT NULL,
    "algorithm" "Algorithm" NOT NULL DEFAULT 'SM2',
    "last_review_date" TIMESTAMP(3),
    "next_review_date" TIMESTAMP(3),
    "review_count" INTEGER NOT NULL DEFAULT 0,
    "ease_factor" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    "interval" INTEGER NOT NULL DEFAULT 0,
    "learning_step" "LearningStep" NOT NULL DEFAULT '1',
    "is_in_learning" BOOLEAN NOT NULL DEFAULT true,
    "word_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "word_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review_sessions" (
    "id" SERIAL NOT NULL,
    "review_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "performance" INTEGER NOT NULL,
    "review_type" "ReviewType" NOT NULL,
    "review_method" "ReviewMethod" NOT NULL DEFAULT 'FullTyping',
    "word_progress_id" INTEGER NOT NULL,
    "word_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "review_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "word_progress_user_id_next_review_date_idx" ON "word_progress"("user_id", "next_review_date");

-- CreateIndex
CREATE UNIQUE INDEX "word_progress_word_id_user_id_key" ON "word_progress"("word_id", "user_id");

-- CreateIndex
CREATE INDEX "review_sessions_word_progress_id_review_date_idx" ON "review_sessions"("word_progress_id", "review_date");

-- AddForeignKey
ALTER TABLE "word_progress" ADD CONSTRAINT "word_progress_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "word_progress" ADD CONSTRAINT "word_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_sessions" ADD CONSTRAINT "review_sessions_word_progress_id_fkey" FOREIGN KEY ("word_progress_id") REFERENCES "word_progress"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_sessions" ADD CONSTRAINT "review_sessions_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_sessions" ADD CONSTRAINT "review_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
