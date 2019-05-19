CREATE TABLE IF NOT EXISTS class_ranks (
  id          INT           NOT NULL AUTO_INCREMENT,
  class_id    INT           NOT NULL,
  yr          YEAR          NOT NULL,
  min_rank_I  DECIMAL(5,2)  NOT NULL COMMENT 'Minimal rank from Ist ranking',
  min_rank_II DECIMAL(5,2)  NOT NULL COMMENT 'Minimal rank from IInd ranking',
  max_rank_I  DECIMAL(5,2)  NOT NULL COMMENT 'Maximal rank from Ist ranking',
  max_rank_II VARCHAR(45)   NOT NULL COMMENT 'Maximal rank from IInd ranking',

  PRIMARY KEY (id),

  INDEX fk_cr_class_idx (class_id ASC) VISIBLE,

  CONSTRAINT fk_cr_class
    FOREIGN KEY (class_id)
    REFERENCES classes (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
)
ENGINE = InnoDB;
