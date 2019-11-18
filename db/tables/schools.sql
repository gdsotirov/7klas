CREATE TABLE schools (
  id          INT           NOT NULL,
  name        VARCHAR(128)  NOT NULL,
  short_name  VARCHAR(32)   NOT NULL,
  telephone   VARCHAR(32)   NULL      DEFAULT NULL,
  address     VARCHAR(128)  NULL      DEFAULT NULL,
  email       VARCHAR(64)   NULL      DEFAULT NULL,
  url         VARCHAR(128)  NULL      DEFAULT NULL,
  city_id     INT           NOT NULL,
  district_id INT           NOT NULL,

  PRIMARY KEY (id),

  INDEX fk_sch_city_idx (city_id ASC) VISIBLE,
  INDEX fk_sch_district_idx (district_id ASC) VISIBLE,

  CONSTRAINT fk_sch_city
    FOREIGN KEY (city_id)
    REFERENCES cities (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT fk_sch_district
    FOREIGN KEY (district_id)
    REFERENCES districts (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
)
ENGINE = InnoDB;
