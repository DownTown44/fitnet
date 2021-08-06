-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema fitnetdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema fitnetdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `fitnetdb` DEFAULT CHARACTER SET utf8 ;
USE `fitnetdb` ;

-- -----------------------------------------------------
-- Table `fitnetdb`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fitnetdb`.`roles` (
  `role_id` INT NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE INDEX `role_name_UNIQUE` (`role_name` ASC) VISIBLE,
  UNIQUE INDEX `role_id_UNIQUE` (`role_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitnetdb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fitnetdb`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `role_id` INT NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(512) NOT NULL,
  `phone_number` VARCHAR(45) NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `FK_USERS_ROLES_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `FK_USERS_ROLES`
    FOREIGN KEY (`role_id`)
    REFERENCES `fitnetdb`.`roles` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitnetdb`.`accessibilities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fitnetdb`.`accessibilities` (
  `accessibility_id` INT NOT NULL AUTO_INCREMENT,
  `accessibility_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`accessibility_id`),
  UNIQUE INDEX `accessibility_name_UNIQUE` (`accessibility_name` ASC) VISIBLE,
  UNIQUE INDEX `accessibility_id_UNIQUE` (`accessibility_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitnetdb`.`groups`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fitnetdb`.`groups` (
  `group_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL COMMENT 'Group owner',
  `accessibility_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(2048) NULL,
  `picture` VARCHAR(512) NULL,
  PRIMARY KEY (`group_id`),
  UNIQUE INDEX `group_id_UNIQUE` (`group_id` ASC) VISIBLE,
  INDEX `user_Id_idx` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  INDEX `FK_GROUPS_ACCESSIBILITIES_idx` (`accessibility_id` ASC) VISIBLE,
  CONSTRAINT `FK_GROUPS_USERS`
    FOREIGN KEY (`user_id`)
    REFERENCES `fitnetdb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_GROUPS_ACCESSIBILITIES`
    FOREIGN KEY (`accessibility_id`)
    REFERENCES `fitnetdb`.`accessibilities` (`accessibility_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitnetdb`.`tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fitnetdb`.`tags` (
  `tag_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `icon` VARCHAR(512) NOT NULL,
  PRIMARY KEY (`tag_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitnetdb`.`group_tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fitnetdb`.`group_tags` (
  `group_tag_id` INT NOT NULL AUTO_INCREMENT,
  `tag_id` INT NOT NULL,
  `group_id` INT NOT NULL,
  PRIMARY KEY (`group_tag_id`),
  UNIQUE INDEX `group_tag_id_UNIQUE` (`group_tag_id` ASC) VISIBLE,
  INDEX `FK_GROUPTAGS_TAGS_idx` (`tag_id` ASC) VISIBLE,
  INDEX `FK_GROUPTAGS_GROUPS_idx` (`group_id` ASC) VISIBLE,
  CONSTRAINT `FK_GROUPTAGS_TAGS`
    FOREIGN KEY (`tag_id`)
    REFERENCES `fitnetdb`.`tags` (`tag_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_GROUPTAGS_GROUPS`
    FOREIGN KEY (`group_id`)
    REFERENCES `fitnetdb`.`groups` (`group_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitnetdb`.`group_members`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fitnetdb`.`group_members` (
  `group_member_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `groupd_id` INT NOT NULL,
  PRIMARY KEY (`group_member_id`),
  UNIQUE INDEX `group_member_id_UNIQUE` (`group_member_id` ASC) VISIBLE,
  INDEX `FK_GROUPMEMBERS_USERS_idx` (`user_id` ASC) VISIBLE,
  INDEX `FK_GROUPMEMBERS_GROUPS_idx` (`groupd_id` ASC) VISIBLE,
  CONSTRAINT `FK_GROUPMEMBERS_USERS`
    FOREIGN KEY (`user_id`)
    REFERENCES `fitnetdb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_GROUPMEMBERS_GROUPS`
    FOREIGN KEY (`groupd_id`)
    REFERENCES `fitnetdb`.`groups` (`group_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitnetdb`.`event_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fitnetdb`.`event_types` (
  `type_id` INT NOT NULL AUTO_INCREMENT,
  `type_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`type_id`),
  UNIQUE INDEX `type_id_UNIQUE` (`type_id` ASC) VISIBLE,
  UNIQUE INDEX `type_name_UNIQUE` (`type_name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitnetdb`.`events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fitnetdb`.`events` (
  `event_id` INT NOT NULL AUTO_INCREMENT,
  `accessibility_id` INT NOT NULL,
  `type_id` INT NOT NULL COMMENT 'Sima event: 1\nEdzes: 2\nRendezveny: 3',
  `owner_id` INT NOT NULL,
  `owner_type` ENUM('user', 'group', 'facility') NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(512) NULL,
  `adress` VARCHAR(100) NULL,
  `min_participant` INT NULL,
  `max_participant` INT NULL,
  `repeat` TINYINT NOT NULL,
  `start_date` DATETIME NOT NULL,
  `end_date` DATETIME NOT NULL,
  PRIMARY KEY (`event_id`),
  UNIQUE INDEX `event_id_UNIQUE` (`event_id` ASC) VISIBLE,
  INDEX `FK_EVENTS_USERS_idx` (`owner_id` ASC) VISIBLE,
  INDEX `FK_EVENTS_ACCESSIBILITIES_idx` (`accessibility_id` ASC) VISIBLE,
  INDEX `FK_EVENTS_EVENTTYPES_idx` (`type_id` ASC) VISIBLE,
  CONSTRAINT `FK_EVENTS_USERS`
    FOREIGN KEY (`owner_id`)
    REFERENCES `fitnetdb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_EVENTS_GROUPS`
    FOREIGN KEY (`owner_id`)
    REFERENCES `fitnetdb`.`groups` (`group_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_EVENTS_ACCESSIBILITIES`
    FOREIGN KEY (`accessibility_id`)
    REFERENCES `fitnetdb`.`accessibilities` (`accessibility_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_EVENTS_EVENTTYPES`
    FOREIGN KEY (`type_id`)
    REFERENCES `fitnetdb`.`event_types` (`type_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitnetdb`.`facilities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fitnetdb`.`facilities` (
  `facility_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `adress` VARCHAR(100) NOT NULL,
  `phone_number` VARCHAR(20) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `description` VARCHAR(2048) NULL,
  `avg_rating` INT NULL,
  PRIMARY KEY (`facility_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  UNIQUE INDEX `phone_number_UNIQUE` (`phone_number` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `facility_id_UNIQUE` (`facility_id` ASC) VISIBLE,
  INDEX `FK_FACILITIES_USERS_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FK_FACILITIES_USERS`
    FOREIGN KEY (`user_id`)
    REFERENCES `fitnetdb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitnetdb`.`facility_tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fitnetdb`.`facility_tags` (
  `facility_tag_id` INT NOT NULL AUTO_INCREMENT,
  `tag_id` INT NOT NULL,
  `facility_id` INT NOT NULL,
  UNIQUE INDEX `facility_tag_id_UNIQUE` (`facility_tag_id` ASC) VISIBLE,
  PRIMARY KEY (`facility_tag_id`),
  INDEX `FK_FACILITYTAGS_TAGS_idx` (`tag_id` ASC) VISIBLE,
  INDEX `FK_FACILITYTAGS_FACILITIES_idx` (`facility_id` ASC) VISIBLE,
  CONSTRAINT `FK_FACILITYTAGS_TAGS`
    FOREIGN KEY (`tag_id`)
    REFERENCES `fitnetdb`.`tags` (`tag_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_FACILITYTAGS_FACILITIES`
    FOREIGN KEY (`facility_id`)
    REFERENCES `fitnetdb`.`facilities` (`facility_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitnetdb`.`fields`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fitnetdb`.`fields` (
  `field_id` INT NOT NULL AUTO_INCREMENT,
  `facility_id` INT NOT NULL,
  `picture` VARCHAR(512) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(100) NULL,
  PRIMARY KEY (`field_id`),
  UNIQUE INDEX `field_id_UNIQUE` (`field_id` ASC) VISIBLE,
  INDEX `FK_FIELDS_FACILITIES_idx` (`facility_id` ASC) VISIBLE,
  CONSTRAINT `FK_FIELDS_FACILITIES`
    FOREIGN KEY (`facility_id`)
    REFERENCES `fitnetdb`.`facilities` (`facility_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitnetdb`.`facility_pictures`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fitnetdb`.`facility_pictures` (
  `facility_picture_id` INT NOT NULL AUTO_INCREMENT,
  `facility_id` INT NOT NULL,
  `picture` VARCHAR(512) NOT NULL,
  PRIMARY KEY (`facility_picture_id`),
  UNIQUE INDEX `facility_picture_id_UNIQUE` (`facility_picture_id` ASC) VISIBLE,
  INDEX `FK_FACILITYPICTURES_FACILITIES_idx` (`facility_id` ASC) VISIBLE,
  CONSTRAINT `FK_FACILITYPICTURES_FACILITIES`
    FOREIGN KEY (`facility_id`)
    REFERENCES `fitnetdb`.`facilities` (`facility_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitnetdb`.`reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fitnetdb`.`reviews` (
  `review_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `facility_id` INT NOT NULL,
  `text` VARCHAR(512) NOT NULL,
  `rating` INT NOT NULL,
  PRIMARY KEY (`review_id`),
  UNIQUE INDEX `review_id_UNIQUE` (`review_id` ASC) VISIBLE,
  INDEX `FK_REVIEWS_FACILITIES_idx` (`facility_id` ASC) VISIBLE,
  INDEX `FK_REVIEWS_USERS_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FK_REVIEWS_FACILITIES`
    FOREIGN KEY (`facility_id`)
    REFERENCES `fitnetdb`.`facilities` (`facility_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_REVIEWS_USERS`
    FOREIGN KEY (`user_id`)
    REFERENCES `fitnetdb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitnetdb`.`bookings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fitnetdb`.`bookings` (
  `booking_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `group_id` INT NULL,
  `facility_id` INT NULL,
  `field_id` INT NULL,
  `notes` VARCHAR(500) NULL,
  `start_date` DATETIME NULL,
  `end_date` DATETIME NULL,
  PRIMARY KEY (`booking_id`),
  UNIQUE INDEX `booking_id_UNIQUE` (`booking_id` ASC) VISIBLE,
  INDEX `FK_BOOKINGS_USERS_idx` (`user_id` ASC) VISIBLE,
  INDEX `FK_BOOKINGS_GROUPS_idx` (`group_id` ASC) VISIBLE,
  INDEX `FK_BOOKINGS_FIELDS_idx` (`field_id` ASC) VISIBLE,
  INDEX `FK_BOOKINGS_FACILITIES_idx` (`facility_id` ASC) VISIBLE,
  CONSTRAINT `FK_BOOKINGS_USERS`
    FOREIGN KEY (`user_id`)
    REFERENCES `fitnetdb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_BOOKINGS_GROUPS`
    FOREIGN KEY (`group_id`)
    REFERENCES `fitnetdb`.`groups` (`group_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_BOOKINGS_FIELDS`
    FOREIGN KEY (`field_id`)
    REFERENCES `fitnetdb`.`fields` (`field_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_BOOKINGS_FACILITIES`
    FOREIGN KEY (`facility_id`)
    REFERENCES `fitnetdb`.`facilities` (`facility_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitnetdb`.`opening_hours`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fitnetdb`.`opening_hours` (
  `opening_hour_id` INT NOT NULL AUTO_INCREMENT,
  `facility_id` INT NOT NULL,
  `day` INT NOT NULL,
  `opening` TIME NOT NULL,
  `closing` TIME NOT NULL,
  PRIMARY KEY (`opening_hour_id`),
  UNIQUE INDEX `idopening_hour_id_UNIQUE` (`opening_hour_id` ASC) VISIBLE,
  INDEX `FK_OPENINGHOURS_FACILITIES_idx` (`facility_id` ASC) VISIBLE,
  CONSTRAINT `FK_OPENINGHOURS_FACILITIES`
    FOREIGN KEY (`facility_id`)
    REFERENCES `fitnetdb`.`facilities` (`facility_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
