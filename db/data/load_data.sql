/* Load min and max rankings from official CSV files and update data */

START TRANSACTION;

LOAD DATA INFILE '/var/mysql/files/sofia-20230712-minmax.csv'
  INTO TABLE 7klas.min_max_1_in
  CHARACTER SET utf8mb4
  FIELDS TERMINATED BY ';'
    OPTIONALLY ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 LINES
  (yr, school_id, class_id, class_name, min_rank, max_rank);

LOAD DATA INFILE '/var/mysql/files/sofia-20230719-minmax.csv'
  INTO TABLE 7klas.min_max_2_in
  CHARACTER SET utf8mb4
  FIELDS TERMINATED BY ';'
    OPTIONALLY ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 LINES
  (yr, school_id, class_id, class_name, min_rank, max_rank);

INSERT INTO classes
   (yr, school_id, id, `name`)
SELECT r1.yr, r1.school_id, r1.class_id, r1.class_name
  FROM min_max_1_in r1,
       min_max_2_in r2
 WHERE r1.yr        = r2.yr
   AND r1.school_id = r2.school_id
   AND r1.class_id  = r2.class_id
ON DUPLICATE KEY
  UPDATE `name`    = r1.class_name;

INSERT INTO class_rankings
  (yr, class_id, min_rank_I, min_rank_II, max_rank_I, max_rank_II)
SELECT r1.yr, r1.class_id,
       r1.min_rank AS `min_rank_I`,
       r2.min_rank AS `min_rank_II`,
       r1.max_rank AS `max_rank_I`,
       r2.max_rank AS `max_rank_II`
  FROM min_max_1_in  r1
       LEFT OUTER JOIN
       min_max_2_in r2
       ON r1.yr = r2.yr
      AND r1.school_id = r2.school_id
      AND r1.class_id = r2.class_id
ON DUPLICATE KEY
  UPDATE min_rank_I   = min_rank_I,
         min_rank_II  = min_rank_II,
         max_rank_I   = max_rank_I,
         max_rank_II  = max_rank_II;

COMMIT;

