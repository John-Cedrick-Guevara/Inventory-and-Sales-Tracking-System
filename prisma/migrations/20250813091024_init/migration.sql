-- DropIndex
DROP INDEX `Product_categoryId_fkey` ON `product`;

-- DropIndex
DROP INDEX `Sale_userId_fkey` ON `sale`;

-- DropIndex
DROP INDEX `SaleItem_productId_fkey` ON `saleitem`;

-- DropIndex
DROP INDEX `SaleItem_saleId_fkey` ON `saleitem`;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleItem` ADD CONSTRAINT `SaleItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleItem` ADD CONSTRAINT `SaleItem_saleId_fkey` FOREIGN KEY (`saleId`) REFERENCES `Sale`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
