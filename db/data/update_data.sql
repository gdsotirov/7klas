/* A sample script showing how to update data after update of subjects,
 * classes and class rankings.
 */

START TRANSACTION;

DELETE FROM 7klas.class_rankings WHERE 1=1;
DELETE FROM 7klas.classes WHERE 1=1;
DELETE FROM 7klas.subjects WHERE 1=1;

LOAD DATA INFILE '/var/mysql/files/subjects.csv'
  INTO TABLE 7klas.subjects
  FIELDS TERMINATED BY ';'
    OPTIONALLY ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 LINES
  (id, `name`);

LOAD DATA INFILE '/var/mysql/files/classes.csv'
  INTO TABLE 7klas.classes
  FIELDS TERMINATED BY ';'
    OPTIONALLY ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 LINES
  (id, `name`, numcl, yr, coef_bel, coef_mat, subj1_id, subj2_id, school_id);

LOAD DATA INFILE '/var/mysql/files/class_rankings.csv'
  INTO TABLE 7klas.class_rankings
  FIELDS TERMINATED BY ';'
    OPTIONALLY ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 LINES
  (class_id, yr, min_rank_I, min_rank_II, max_rank_I, max_rank_II);

COMMIT;

