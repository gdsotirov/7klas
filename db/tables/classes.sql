CREATE TABLE classes (
  id        INT(8)      NOT NULL,
  name      VARCHAR(64) NOT NULL,
  numcl     INT(1)      NOT NULL COMMENT 'Number of classes',
  yr        YEAR        NOT NULL COMMENT 'School year starting',
  coef_bel  INT(1)      NOT NULL COMMENT 'Coeficient for BEL result',
  coef_mat  VARCHAR(45) NOT NULL COMMENT 'Coeficient for MAT result',
  subj1_id  VARCHAR(5)  NOT NULL COMMENT 'Subject 1',
  subj2_id  VARCHAR(5)  NOT NULL COMMENT 'Subject 2',
  school_id INT         NOT NULL,

  PRIMARY KEY (id),

  INDEX fk_class_school_idx (school_id ASC) VISIBLE,
  INDEX fk_class_subj1_idx (subj1_id ASC) VISIBLE,
  INDEX fk_class_subj2_idx (subj2_id ASC) VISIBLE,

  CONSTRAINT fk_class_school
    FOREIGN KEY (school_id)
    REFERENCES schools (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT fk_class_subj1
    FOREIGN KEY (subj1_id)
    REFERENCES subjects (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT fk_class_subj2
    FOREIGN KEY (subj2_id)
    REFERENCES subjects (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
)
ENGINE = InnoDB;
