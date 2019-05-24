CREATE OR REPLACE VIEW ClassRanksJSON AS
SELECT JSON_OBJECT("schlName"	, schlName,
                       "clsName" 	, clsName,
                       "min_rank_I"	, min_rank_I,
                       "min_rank_II", min_rank_II
                      ) json_obj
  FROM ClassRanks;
