CREATE OR REPLACE VIEW ClassRanks AS
SELECT ROW_NUMBER() OVER(
         PARTITION BY CR.yr
         ORDER BY CR.yr, CR.min_rank_II DESC)       AS rnkNum,
       CAST(CR.yr AS CHAR(4))                       AS clsYear,
       CONCAT(D.id, ' ', D.`name`)                  AS schlDist,
       CONCAT(SC.id, ' ', SC.short_name)            AS schlName,
       CONCAT(LPAD(CL.id, 4, '0'), ' ', CL.`name`)  AS clsName,
       CR.min_rank_I                                AS min_rank_I,
       CR.min_rank_II                               AS min_rank_II
  FROM classes        CL,
       class_rankings CR,
       districts      D,
       schools        SC
 WHERE CR.class_id    = CL.id
   AND CR.yr          = CL.yr
   AND SC.district_id = D.id
   AND CL.school_id   = SC.id
   AND ( CR.min_rank_I > 0 OR CR.min_rank_II > 0 )
 ORDER BY CR.yr, CR.min_rank_II DESC;
