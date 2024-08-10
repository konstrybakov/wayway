-- DropForeignKey
ALTER TABLE "examples" DROP CONSTRAINT "examples_wordId_fkey";

-- AddForeignKey
ALTER TABLE "examples" ADD CONSTRAINT "examples_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE;
