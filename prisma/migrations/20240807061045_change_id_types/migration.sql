/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Category` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Example` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Example` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Word` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Word` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `wordId` to the `Example` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `A` on the `_CategoryToWord` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_CategoryToWord` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Example" DROP CONSTRAINT "Example_wordId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToWord" DROP CONSTRAINT "_CategoryToWord_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToWord" DROP CONSTRAINT "_CategoryToWord_B_fkey";

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Example" DROP CONSTRAINT "Example_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "wordId",
ADD COLUMN     "wordId" INTEGER NOT NULL,
ADD CONSTRAINT "Example_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Word" DROP CONSTRAINT "Word_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Word_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_CategoryToWord" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToWord_AB_unique" ON "_CategoryToWord"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToWord_B_index" ON "_CategoryToWord"("B");

-- AddForeignKey
ALTER TABLE "Example" ADD CONSTRAINT "Example_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToWord" ADD CONSTRAINT "_CategoryToWord_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToWord" ADD CONSTRAINT "_CategoryToWord_B_fkey" FOREIGN KEY ("B") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;
