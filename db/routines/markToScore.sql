DELIMITER /

CREATE FUNCTION markToScore(mark INT)
  RETURNS INT
  DETERMINISTIC
BEGIN
  DECLARE score INT;

  SET score := CASE mark
    WHEN 6 THEN 50
    WHEN 5 THEN 39
    WHEN 4 THEN 26
    WHEN 3 THEN 15
    ELSE 0
  END;

  RETURN score;
END /

DELIMITER ;
