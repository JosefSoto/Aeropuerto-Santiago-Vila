-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema SANTIAGOVILA_BD
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema SANTIAGOVILA_BD
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `SANTIAGOVILA_BD` DEFAULT CHARACTER SET utf8 ;
USE `SANTIAGOVILA_BD` ;

-- -----------------------------------------------------
-- Table `SANTIAGOVILA_BD`.`AEROLINEAS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SANTIAGOVILA_BD`.`AEROLINEAS` (
  `Nombre` VARCHAR(50) NOT NULL,
  `Codigo` VARCHAR(10) NOT NULL,
  `Aviones` VARCHAR(32) NOT NULL,
  `Logo` VARCHAR(45) NULL,
  PRIMARY KEY (`Codigo`));


-- -----------------------------------------------------
-- Table `SANTIAGOVILA_BD`.`AVIONES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SANTIAGOVILA_BD`.`AVIONES` (
  `Codigo` VARCHAR(20) NOT NULL,
  `Modelo` VARCHAR(20) NOT NULL,
  `Aerolinea` VARCHAR(50) NOT NULL,
  `Sillas` INT NOT NULL,
  PRIMARY KEY (`Codigo`),
  INDEX `due_idx` (`Aerolinea` ASC) VISIBLE,
  CONSTRAINT `due`
    FOREIGN KEY (`Aerolinea`)
    REFERENCES `SANTIAGOVILA_BD`.`AEROLINEAS` (`Codigo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `SANTIAGOVILA_BD`.`VUELOS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SANTIAGOVILA_BD`.`VUELOS` (
  `codigo` VARCHAR(10) NOT NULL,
  `Aerolinea` VARCHAR(50) NOT NULL,
  `Origen` VARCHAR(255) NOT NULL,
  `Destino` VARCHAR(255) NOT NULL,
  `Dia` DATETIME NOT NULL,
  `Hora` DATETIME NOT NULL,
  `Avion` VARCHAR(45) NOT NULL,
  `Estado` VARCHAR(45) NOT NULL,
  `Sillas` INT NOT NULL,
  PRIMARY KEY (`codigo`),
  INDEX `Aerolinea_idx` (`Aerolinea` ASC) VISIBLE,
  INDEX `Avion_idx` (`Avion` ASC) VISIBLE,
  CONSTRAINT `Aerol`
    FOREIGN KEY (`Aerolinea`)
    REFERENCES `SANTIAGOVILA_BD`.`AEROLINEAS` (`Codigo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Avion`
    FOREIGN KEY (`Avion`)
    REFERENCES `SANTIAGOVILA_BD`.`AVIONES` (`Codigo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `SANTIAGOVILA_BD`.`PILOTOS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SANTIAGOVILA_BD`.`PILOTOS` (
  `Nombre` VARCHAR(100) NOT NULL,
  `Documento` VARCHAR(50) NOT NULL,
  `Aerolinea` VARCHAR(50) NOT NULL,
  `Telefono` VARCHAR(10) NOT NULL,
  `foto` VARCHAR(45) NOT NULL,
  `Vuelos` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Documento`),
  INDEX `vuelos_idx` (`Vuelos` ASC) VISIBLE,
  CONSTRAINT `vuelos`
    FOREIGN KEY (`Vuelos`)
    REFERENCES `SANTIAGOVILA_BD`.`VUELOS` (`codigo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `SANTIAGOVILA_BD`.`USUARIOS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SANTIAGOVILA_BD`.`USUARIOS` (
  `Nombre` VARCHAR(255) NOT NULL,
  `Contrasenia` VARCHAR(45) NULL,
  `Tipo` VARCHAR(45) NULL,
  `Documento` VARCHAR(45) NULL,
  `Correo` VARCHAR(100) NULL,
  `Telefono` VARCHAR(45) NULL,
  `Foto` VARCHAR(45) NULL,
  PRIMARY KEY (`Nombre`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
