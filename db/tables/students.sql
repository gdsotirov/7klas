CREATE TABLE students (
  id            INT         NOT NULL AUTO_INCREMENT,
  name          VARCHAR(64) NOT NULL COMMENT 'Full name',
  score_nea_bel INT(3)      NOT NULL COMMENT 'Score from National External Assesment BEL',
  score_nea_mat INT(3)      NOT NULL COMMENT 'Score from National External Assesment MAT',

  PRIMARY KEY (id)
)
ENGINE = InnoDB;
