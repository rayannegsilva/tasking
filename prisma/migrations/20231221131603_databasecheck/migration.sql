/*
  Warnings:

  - Added the required column `cardId` to the `Checklist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Checklist` ADD COLUMN `cardId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `Checklist_cardId_idx` ON `Checklist`(`cardId`);
