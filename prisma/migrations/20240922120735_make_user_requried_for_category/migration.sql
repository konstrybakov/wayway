/*
  Warnings:

  - Made the column `user_id` on table `categories` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "user_id" SET NOT NULL;