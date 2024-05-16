/* 7klas utility functions */

var $7klas_utl = {}

/**
 * Round to given number of places
 * @param number Number to round
 * @param places Places to round to
 * @returns Number rounded
 */
$7klas_utl.round = function (number, places) {
  return Math.round(number * Math.pow(10, places)) / Math.pow(10, places);
}

/**
 * Convert mark to scores (see ???)
 * @param mark Mark in six-point marking system
 * @returns Scores
 */
$7klas_utl.markToScore = function (mark, year = new Date().getFullYear()) {
  var score;

  if ( isNaN(mark) ) {
    throw "Mark is NOT a number!";
  }

  if ( year <= 2021 ) {
    switch(Math.round(mark)) {
        case 6: score = 50; break;
        case 5: score = 39; break;
        case 4: score = 26; break;
        case 3: score = 15; break;
        default: score = 0;
    }
  }
  else {
    if ( mark == 6.00 )                { score = 50; } else
    if ( mark >= 5.67 && mark < 6.00 ) { score = 47; } else
    if ( mark >= 5.50 && mark < 5.67 ) { score = 44; } else
    if ( mark >= 5.33 && mark < 5.50 ) { score = 41; } else
    if ( mark >= 5.00 && mark < 5.33 ) { score = 39; } else
    if ( mark >= 4.67 && mark < 5.00 ) { score = 36; } else
    if ( mark >= 4.50 && mark < 4.67 ) { score = 32; } else
    if ( mark >= 4.33 && mark < 4.50 ) { score = 29; } else
    if ( mark >= 4.00 && mark < 4.33 ) { score = 26; } else
    if ( mark >= 3.67 && mark < 4.00 ) { score = 23; } else
    if ( mark >= 3.50 && mark < 3.67 ) { score = 20; } else
    if ( mark >= 3.33 && mark < 3.50 ) { score = 17; } else
    if ( mark >= 3.00 && mark < 3.33 ) { score = 15; }
    else                               { score = 0;  }
  }

  return score;
}

/**
 * Convert scores to mark (see ???)
 * @param score Scores from exam
 * @returns Mark in six-point marking system
 */
$7klas_utl.scoreToMark = function (score) {
  var mark;

  if ( isNaN(score) ) {
    throw "Score is NOT a number!";
  }

  if ( score < 0 || score > 100 ) {
    throw "Score should be between 0 and 100!";
  }

  if (score <= 15) {
    mark = 2.0;
  }
  else {
    mark = this.round((score + 68)/28, 3);
  }

  return mark;
}

/**
 * Filter only unique items in an array
 */
$7klas_utl.unique_items = function (value, index, self) {
  return self.indexOf(value) === index;
}

/**
 * Get the maximum element of a numeric array
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max#getting_the_maximum_element_of_an_array
 */
$7klas_utl.getMaxOfArray = function (numArray) {
  return Math.max.apply(null, numArray);
}

