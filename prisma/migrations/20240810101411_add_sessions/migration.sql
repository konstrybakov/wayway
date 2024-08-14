/*
  Warnings:

  - You are about to drop the `review_sessions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "review_sessions" DROP CONSTRAINT "review_sessions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "review_sessions" DROP CONSTRAINT "review_sessions_word_id_fkey";

-- DropForeignKey
ALTER TABLE "review_sessions" DROP CONSTRAINT "review_sessions_word_progress_id_fkey";

-- DropTable
DROP TABLE "review_sessions";

-- CreateTable
CREATE TABLE "practice_attempts" (
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
    "practiceSessionId" TEXT,

    CONSTRAINT "practice_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PracticeSession" (
    "id" TEXT NOT NULL,
    "size" INTEGER NOT NULL DEFAULT 10,
    "words" INTEGER[],
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PracticeSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "practice_attempts_word_progress_id_review_date_idx" ON "practice_attempts"("word_progress_id", "review_date");

-- AddForeignKey
ALTER TABLE "practice_attempts" ADD CONSTRAINT "practice_attempts_word_progress_id_fkey" FOREIGN KEY ("word_progress_id") REFERENCES "word_progress"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_attempts" ADD CONSTRAINT "practice_attempts_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_attempts" ADD CONSTRAINT "practice_attempts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_attempts" ADD CONSTRAINT "practice_attempts_practiceSessionId_fkey" FOREIGN KEY ("practiceSessionId") REFERENCES "PracticeSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PracticeSession" ADD CONSTRAINT "PracticeSession_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
