-- CreateTable
CREATE TABLE `Enderecos` (
    `idenderecos` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `cep` VARCHAR(45) NOT NULL,
    `endereco` VARCHAR(45) NOT NULL,
    `numero` VARCHAR(45) NOT NULL,
    `complemento` VARCHAR(45) NULL,
    `bairro` VARCHAR(45) NOT NULL,
    `estado` VARCHAR(45) NOT NULL,
    `cidade` VARCHAR(45) NOT NULL,
    `idpessoas` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`idenderecos`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pessoas` (
    `idpessoas` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `sexo` VARCHAR(20) NOT NULL,
    `dtNascimento` DATE NOT NULL,
    `estadoCivil` VARCHAR(20) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`idpessoas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Enderecos` ADD CONSTRAINT `Enderecos_idpessoas_fkey` FOREIGN KEY (`idpessoas`) REFERENCES `Pessoas`(`idpessoas`) ON DELETE RESTRICT ON UPDATE CASCADE;
