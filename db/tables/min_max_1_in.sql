CREATE TABLE min_max_1_in (
  yr          YEAR          NOT NULL,
  school_id   INT           NOT NULL,
  class_id    INT           NOT NULL,
  class_name  VARCHAR(96)   NOT NULL,
  min_rank    DECIMAL(5,2)  NOT NULL,
  max_rank    DECIMAL(5,2)  NOT NULL,

  PRIMARY KEY (yr, school_id, class_id),

  INDEX fk_school_id_1_idx (school_id ASC) VISIBLE,

  CONSTRAINT fk_school_id_1
    FOREIGN KEY (school_id)
    REFERENCES schools (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
)
COMMENT = 'Table for loading data from I-st ranking'
ENGINE = InnoDB;
