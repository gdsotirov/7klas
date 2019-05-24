CREATE OR REPLACE VIEW ClassRanks AS
SELECT CONCAT(SC.id, ' ', SC.short_name) schlName,
       CONCAT(SUBSTR(CONVERT(CL.id, CHAR), 5), ' ', CL.`name`)     clsName,
       CR.min_rank_I,
       CR.min_rank_II
  FROM classes        CL,
       class_rankings CR,
       schools        SC
 WHERE CR.class_id = CL.id
   AND CL.school_id = SC.id
   AND CL.yr = YEAR(CURDATE())
   AND CR.yr = YEAR(CURDATE()) - 1
 ORDER BY CR.min_rank_II DESC;
