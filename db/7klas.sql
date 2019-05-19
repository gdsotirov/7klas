-- MySQL Workbench Synchronization
-- Generated: 2019-05-18 22:45
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: admin

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE TABLE IF NOT EXISTS `7klas`.`schools` (
  `id` INT(7) NOT NULL,
  `name` VARCHAR(128) NOT NULL,
  `short_name` VARCHAR(32) NOT NULL,
  `telephone` VARCHAR(32) NULL DEFAULT NULL,
  `address` VARCHAR(128) NULL DEFAULT NULL,
  `email` VARCHAR(64) NULL DEFAULT NULL,
  `url` VARCHAR(128) NULL DEFAULT NULL,
  `city_id` INT(11) NOT NULL,
  `district_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_sch_city_idx` (`city_id` ASC) VISIBLE,
  INDEX `fk_sch_district_idx` (`district_id` ASC) VISIBLE,
  CONSTRAINT `fk_sch_city`
    FOREIGN KEY (`city_id`)
    REFERENCES `7klas`.`cities` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_sch_district`
    FOREIGN KEY (`district_id`)
    REFERENCES `7klas`.`districts` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `7klas`.`districts` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `num` INT(11) NOT NULL,
  `city_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_reg_city_idx` (`city_id` ASC) VISIBLE,
  CONSTRAINT `fk_reg_city`
    FOREIGN KEY (`city_id`)
    REFERENCES `7klas`.`cities` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `7klas`.`cities` (
  `id` INT(4) NOT NULL,
  `name` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `7klas`.`classes` (
  `id` INT(8) NOT NULL,
  `name` VARCHAR(64) NOT NULL,
  `numcl` INT(1) NOT NULL COMMENT 'Number of classes',
  `yr` YEAR NOT NULL 
  `coef_bel` INT(1) NOT NULL COMMENT 'Coeficient for BEL result',
  `coef_mat` VARCHAR(45) NOT NULL COMMENT 'Coeficient for MAT result',
  `subj1_id` VARCHAR(5) NOT NULL COMMENT 'Subject 1',
  `subj2_id` VARCHAR(5) NOT NULL COMMENT 'Subject 2',
  `school_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_class_school_idx` (`school_id` ASC) VISIBLE,
  INDEX `fk_class_subj1_idx` (`subj1_id` ASC) VISIBLE,
  INDEX `fk_class_subj2_idx` (`subj2_id` ASC) VISIBLE,
  CONSTRAINT `fk_class_school`
    FOREIGN KEY (`school_id`)
    REFERENCES `7klas`.`schools` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_class_subj1`
    FOREIGN KEY (`subj1_id`)
    REFERENCES `7klas`.`subjects` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_class_subj2`
    FOREIGN KEY (`subj2_id`)
    REFERENCES `7klas`.`subjects` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `7klas`.`subjects` (
  `id` VARCHAR(5) NOT NULL,
  `name` VARCHAR(42) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `7klas`.`students` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(64) NOT NULL COMMENT 'Full name',
  `score_nea_bel` INT(3) NOT NULL COMMENT 'Score from National External Assesment BEL',
  `score_nea_mat` INT(3) NOT NULL COMMENT 'Score from National External Assesment MAT',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `7klas`.`subj_marks` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `student_id` INT(11) NOT NULL,
  `subject_id` VARCHAR(5) NOT NULL,
  `mark` INT(1) NOT NULL CONSTRAINT mark_check CHECK (mark >= 2 AND mark <= 6),
  PRIMARY KEY (`id`),
  INDEX `fk_sm_student_idx` (`student_id` ASC) VISIBLE,
  INDEX `fk_sm_subject_idx` (`subject_id` ASC) VISIBLE,
  CONSTRAINT `fk_sm_student`
    FOREIGN KEY (`student_id`)
    REFERENCES `7klas`.`students` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sm_subject`
    FOREIGN KEY (`subject_id`)
    REFERENCES `7klas`.`subjects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


DELIMITER $$
USE `7klas`$$
CREATE FUNCTION mark_to_score(mark INT)
  RETURNS INT(2)
  DETERMINISTIC
BEGIN
  DECLARE score INT(2);

  SET score := CASE mark
    WHEN 6 THEN 50
    WHEN 5 THEN 39
    WHEN 4 THEN 26
    WHEN 3 THEN 15
    ELSE 0
  END;

  RETURN score;
END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
