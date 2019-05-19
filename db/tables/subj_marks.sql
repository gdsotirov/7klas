CREATE TABLE subj_marks (
  id          INT         NOT NULL AUTO_INCREMENT,
  student_id  INT         NOT NULL,
  subject_id  VARCHAR(5)  NOT NULL,
  mark        INT(1)      NOT NULL CONSTRAINT mark_check CHECK (mark >= 2 AND mark <= 6),

  PRIMARY KEY (id),

  INDEX fk_sm_student_idx (student_id ASC) VISIBLE,
  INDEX fk_sm_subject_idx (subject_id ASC) VISIBLE,

  CONSTRAINT fk_sm_student
    FOREIGN KEY (student_id)
    REFERENCES students (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_sm_subject
    FOREIGN KEY (subject_id)
    REFERENCES subjects (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
ENGINE = InnoDB;
