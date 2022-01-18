-- CreateTable
CREATE TABLE `shopify_session_storage` (
    `id` VARCHAR(191) NOT NULL,
    `shop` TEXT NULL,
    `state` TEXT NULL,
    `scope` TEXT NULL,
    `expires` TEXT NULL,
    `isOnline` TEXT NULL,
    `accessToken` TEXT NULL,
    `onlineAccessInfo` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shopify_billing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chargeId` TEXT NOT NULL,
    `shop` VARCHAR(191) NOT NULL,
    `gid` TEXT NOT NULL,
    `status` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `shopify_billing_shop_key`(`shop`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
