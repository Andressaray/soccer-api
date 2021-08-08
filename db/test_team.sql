-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema test_team
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema test_team
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `test_team` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema test_team
-- -----------------------------------------------------
USE `test_team` ;

-- -----------------------------------------------------
-- Table `test_team`.`profile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test_team`.`profile` (
  `id_profile` INT(2) NOT NULL,
  `roll` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_profile`))
ENGINE = INNODB;


-- -----------------------------------------------------
-- Table `test_team`.`position`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test_team`.`position` (
  `id_position` INT(2) NOT NULL AUTO_INCREMENT,
  `position` VARCHAR(45) NOT NULL,
  `description` TEXT(100) NULL,
  PRIMARY KEY (`id_position`))
ENGINE = INNODB;


-- -----------------------------------------------------
-- Table `test_team`.`league`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test_team`.`league` (
  `id_league` INT(2) NOT NULL AUTO_INCREMENT,
  `name_league` VARCHAR(70) NOT NULL,
  PRIMARY KEY (`id_league`))
ENGINE = INNODB;


-- -----------------------------------------------------
-- Table `test_team`.`country`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test_team`.`country` (
  `id_country` VARCHAR(2) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_country`))
ENGINE = INNODB;


-- -----------------------------------------------------
-- Table `test_team`.`departament`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test_team`.`departament` (
  `id_departament` INT NOT NULL,
  `departament` VARCHAR(100) NOT NULL,
  `id_country` VARCHAR(2) NOT NULL,
  PRIMARY KEY (`id_departament`),
  INDEX `fk_departaments_country1_idx` (`id_country` ASC),
  CONSTRAINT `fk_departaments_country1`
    FOREIGN KEY (`id_country`)
    REFERENCES `test_team`.`country` (`id_country`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = INNODB;


-- -----------------------------------------------------
-- Table `test_team`.`team`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test_team`.`team` (
  `id_team` INT NOT NULL AUTO_INCREMENT,
  `name_team` VARCHAR(70) NOT NULL,
  `id_league` INT(2) NOT NULL,
  `id_country` VARCHAR(2) NOT NULL,
  `id_departament` INT NOT NULL,
  PRIMARY KEY (`id_team`),
  INDEX `fk_team_league1_idx` (`id_league` ASC),
  INDEX `fk_team_country1_idx` (`id_country` ASC),
  INDEX `fk_team_departaments1_idx` (`id_departament` ASC),
  CONSTRAINT `fk_team_league1`
    FOREIGN KEY (`id_league`)
    REFERENCES `test_team`.`league` (`id_league`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_team_country1`
    FOREIGN KEY (`id_country`)
    REFERENCES `test_team`.`country` (`id_country`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_team_departaments1`
    FOREIGN KEY (`id_departament`)
    REFERENCES `test_team`.`departament` (`id_departament`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = INNODB;


-- -----------------------------------------------------
-- Table `test_team`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test_team`.`user` (
  `id_user` INT(12) NOT NULL AUTO_INCREMENT,
  `identification` VARCHAR(12) NOT NULL,
  `name_1` VARCHAR(45) NOT NULL,
  `name_2` VARCHAR(45) NULL,
  `lastname_1` VARCHAR(45) NOT NULL,
  `lastname_2` VARCHAR(45) NULL,
  `age` INT(2) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `password` TEXT NOT NULL,
  `id_profile` INT NOT NULL,
  `id_position` INT NOT NULL,
  `id_team` INT NOT NULL,
  `id_country` VARCHAR(2) NOT NULL,
  `id_departament` INT NOT NULL,
  PRIMARY KEY (`id_user`, `identification`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `fk_user_profiles1_idx` (`id_profile` ASC),
  INDEX `fk_user_positions1_idx` (`id_position` ASC),
  INDEX `fk_user_team1_idx` (`id_team` ASC),
  UNIQUE INDEX `identification_UNIQUE` (`identification` ASC),
  INDEX `fk_user_country1_idx` (`id_country` ASC) VISIBLE,
  INDEX `fk_user_departaments1_idx` (`id_departament` ASC),
  CONSTRAINT `fk_user_profiles1`
    FOREIGN KEY (`id_profile`)
    REFERENCES `test_team`.`profile` (`id_profile`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_positions1`
    FOREIGN KEY (`id_position`)
    REFERENCES `test_team`.`position` (`id_position`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_team1`
    FOREIGN KEY (`id_team`)
    REFERENCES `test_team`.`team` (`id_team`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_country1`
    FOREIGN KEY (`id_country`)
    REFERENCES `test_team`.`country` (`id_country`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_departaments1`
    FOREIGN KEY (`id_departament`)
    REFERENCES `test_team`.`departament` (`id_departament`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = INNODB;


-- -----------------------------------------------------
-- Table `test_team`.`indumentary`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test_team`.`indumentary` (
  `id_user` INT(12) NOT NULL,
  `squad_number` INT(2) NOT NULL,
  `foot_size` INT(2) NULL,
  `short_size` INT(2) NULL,
  `shirt_size` INT(2) NULL,
  INDEX `fk_indumentary_user_idx` (`id_user` ASC),
  CONSTRAINT `fk_indumentary_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `test_team`.`user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = INNODB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
