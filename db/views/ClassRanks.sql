CREATE OR REPLACE VIEW ClassRanks AS
SELECT CAST(CR.yr AS CHAR(4)) clsYear,
       CONCAT(SC.id, ' ', SC.short_name) schlName,
       CONCAT(LPAD(CL.id, 4, '0'), ' ', CL.`name`)     clsName,
       CR.min_rank_I,
       CR.min_rank_II
  FROM classes        CL,
       class_rankings CR,
       schools        SC
 WHERE CR.class_id  = CL.id
   AND CR.yr        = CL.yr
   AND CL.school_id = SC.id
   AND ( CR.min_rank_I > 0 OR CR.min_rank_II > 0 )
 ORDER BY CR.yr, CR.min_rank_II DESC;
