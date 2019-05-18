CREATE TABLE districts (
  id      INT         NOT NULL AUTO_INCREMENT,
  name    VARCHAR(45) NOT NULL,
  num     INT         NOT NULL,
  city_id INT         NOT NULL,

  PRIMARY KEY (id),

  INDEX fk_reg_city_idx (city_id ASC) VISIBLE,

  CONSTRAINT fk_reg_city
    FOREIGN KEY (city_id)
    REFERENCES cities (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
)
ENGINE = InnoDB;
