-- AlterTable
ALTER TABLE "words" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "frequency_category" DROP NOT NULL,
ALTER COLUMN "register_category" DROP NOT NULL,
ALTER COLUMN "difficulty_category" DROP NOT NULL;
