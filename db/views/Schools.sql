CREATE OR REPLACE VIEW Schools AS
SELECT S.id     AS `Code`,
       S.`name` AS `Name`,
       C.`name` AS `City`,
       D.`name` AS `District`
  FROM cities    C,
       districts D,
       schools   S
 WHERE C.id = S.city_id
   AND D.id = S.district_id
  ORDER BY S.id;
