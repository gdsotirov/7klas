/* 7klas utility functions */

var $7klas = {}

/**
 * Convert mark to scores (see ???)
 * @param mark Mark in six-point marking system
 * @returns Scores
 */
$7klas.mark_to_score = function (mark) {
  var score = 0;

  if ( isNaN(mark) ) {
    throw "Mark is NOT a number!";
  }

  switch(Math.round(mark)) {
      case 6: score = 50; break;
      case 5: score = 39; break;
      case 4: score = 26; break;
      case 3: score = 15; break;
      default: score = 0;
  }

  return score;
}
