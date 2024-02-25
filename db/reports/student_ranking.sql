SELECT ST.`name`, SC.short_name, CL.`name`, DS.`name`,
       CL.coef_bel * ST.score_nea_bel +
       CL.coef_mat * ST.score_nea_mat +
       markToScore(SUBJ1.mark) +
       markToScore(SUBJ2.mark) total_score,
       CR.min_rank_I,
       CR.min_rank_II
  FROM classes        CL,
       class_rankings CR,
       schools        SC,
       cities         CT,
       districts      DS,
       students       ST,
       LATERAL
       (SELECT subject_id, mark
          FROM subj_marks
         WHERE student_id = ST.id
           AND subject_id = CL.subj1_id
       ) SUBJ1,
       LATERAL
       (SELECT subject_id, mark
          FROM subj_marks
         WHERE student_id = ST.id
           AND subject_id = CL.subj2_id
       ) SUBJ2
 WHERE CL.school_id = SC.id
   AND CR.class_id = CL.id
   AND SC.city_id = CT.id
   AND SC.district_id = DS.id
   AND CL.yr = YEAR(CURDATE())
   AND CR.yr = YEAR(CURDATE()) - 1
   AND CT.id = 1000 /* Sofia */
   AND ST.id = 1
 /*AND CL.coef_bel * ST.score_nea_bel +
       CL.coef_mat * ST.score_nea_mat +
       markToScore(SUBJ1.mark) +
       markToScore(SUBJ2.mark) >= CR.min_rank_II */
 ORDER BY CR.min_rank_II DESC;
