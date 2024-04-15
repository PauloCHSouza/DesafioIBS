-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `login` VARCHAR(45) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Usuario_login_key`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
