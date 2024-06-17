CREATE TABLE students (
  id            INT         NOT NULL AUTO_INCREMENT,
  name          VARCHAR(64) NOT NULL COMMENT 'Full name',
  score_nea_bel INT         NOT NULL COMMENT 'Score from National External Assessment BEL',
  score_nea_mat INT         NOT NULL COMMENT 'Score from National External Assessment MAT',

  PRIMARY KEY (id)
)
ENGINE = InnoDB;
