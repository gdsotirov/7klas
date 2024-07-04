CREATE OR REPLACE VIEW SchoolDistrictsJSON AS
SELECT JSON_OBJECT("distId"     , id,
                   "distName"   , `name`
                  ) json_obj
  FROM districts
 ORDER BY `name`;
