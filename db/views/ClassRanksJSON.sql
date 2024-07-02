CREATE OR REPLACE VIEW ClassRanksJSON AS
SELECT JSON_OBJECT("rnkNum"       , rnkNum,
                   "clsYear"      , clsYear,
                   "schlDistId"   , schlDistId,
                   "schlDistName" , schlDistName,
                   "schlId"       , schlId,
                   "schlName"     , schlName,
                   "schlFullName" , schlFullName,
                   "clsId"        , clsId,
                   "clsName"      , clsName,
                   "min_rank_I"   , min_rank_I,
                   "min_rank_II"  , min_rank_II
                  ) json_obj
  FROM ClassRanks;
