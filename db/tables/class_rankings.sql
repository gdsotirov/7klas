CREATE TABLE class_rankings (
  yr          YEAR          NOT NULL,
  class_id    INT           NOT NULL,
  min_rank_I  DECIMAL(5,2)  NOT NULL COMMENT 'Minimal rank from Ist ranking',
  min_rank_II DECIMAL(5,2)  NOT NULL COMMENT 'Minimal rank from IInd ranking',
  max_rank_I  DECIMAL(5,2)  NOT NULL COMMENT 'Maximal rank from Ist ranking',
  max_rank_II VARCHAR(45)   NOT NULL COMMENT 'Maximal rank from IInd ranking',

  PRIMARY KEY (yr, class_id),

  CONSTRAINT fk_cr_class
    FOREIGN KEY (yr , class_id)
    REFERENCES classes (yr , id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
)
ENGINE = InnoDB;
