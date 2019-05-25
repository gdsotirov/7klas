/* 7klas Application Controler */

angular.module('7klas_app', []).controller('7klas_ctrl', function($scope, $http) {
  $scope.stName = '';
  $scope.stNEABEL = '';
  $scope.stNEAMAT = '';
  $scope.stSubj1 = '';
  $scope.stSubj2 = '';
  $scope.stRank = '';

  $scope.cls_rnks == '';
  /* For running locally
    $scope.cls_rnks = [
    {schlName:'Училище 1', clsName:"Клас А", min_rank_I:456, min_rank_II:432 },
    {schlName:'Училище 2', clsName:"Клас Б", min_rank_I:321, min_rank_II:123 }
  ];

  var $num = 0;
  angular.forEach($scope.cls_rnks, function(item) {
    item.number = ++$num;
  });*/

  $http.get("get_ranks.php").then(function (response) {
      /* Number rows here, because in MySQL 5.7 Window functions (e.g.
       * ROW_NUMBER) is not available.
       */
      var $num = 0;
      $scope.cls_rnks = response.data;
      angular.forEach($scope.cls_rnks, function(item) {
        item.number = ++$num;
      });
  });

  $scope.edit = true;
  $scope.error = false;
  $scope.incomplete = false;
  $scope.hideform = true;

  $scope.addStudent = function() {
    $scope.hideform = false;

    $scope.edit = true;

    $scope.incomplete = true;
    if ($scope.edit            &&
        $scope.stName.length   &&
        $scope.stNEABEL.length &&
        $scope.stNEAMAT.length &&
        $scope.stSubj1.length  &&
        $scope.stSubj2.length
       )
    {
      $scope.incomplete = false;
    }
  };

  $scope.mark_to_score = function(mark) {
    var score = 0;
    switch(mark) {
        case 6: score = 50; break;
        case 5: score = 39; break;
        case 4: score = 26; break;
        case 3: score = 15; break;
        default: score = 0;
    }
    return score;
  };

  $scope.calcRank = function(bel, mat, subj1, subj2) {
    var rank = (1 * bel) + (3 * mat) +
               $scope.mark_to_score(subj1) + $scope.mark_to_score(subj2);
    return rank;
  };

  $scope.showRank = function() {
    var scBEL, scMAT, scS1, scS2;
    if ( $scope.stNEABEL == '' || isNaN($scope.stNEABEL) ) {
      scBEL = 0;
    }
    else {
      scBEL = parseFloat($scope.stNEABEL);
    }

    if ( $scope.stNEAMAT == '' || isNaN($scope.stNEAMAT) ) {
      scMAT = 0;
    }
    else {
      scMAT = parseFloat($scope.stNEAMAT);
    }

    if ( $scope.stSubj1 == '' || isNaN($scope.stSubj1) ) {
      scS1 = 0;
    }
    else {
      scS1 = parseInt($scope.stSubj1);
    }

    if ( $scope.stSubj2 == '' || isNaN($scope.stSubj2) ) {
      scS2 = 0;
    }
    else {
      scS2 = parseInt($scope.stSubj2);
    }

    $scope.stRank = $scope.calcRank(scBEL, scMAT, scS1, scS2);
  }

  $scope.rankStudent = function() {
    $scope.hideform = true;

    var student_ranked = false;
    var new_arr = [];
    var new_item = {};

    /* Initialize with student's data */
    new_item.schlName = $scope.stName;
    new_item.clsName  = 'n/a';
    new_item.min_rank_I = $scope.stRank;
    new_item.min_rank_II = $scope.stRank;

    var num = 0;
    angular.forEach($scope.cls_rnks, function(item) {
      if ( $scope.stRank >= parseFloat(item.min_rank_I) && !student_ranked ) {
        student_ranked = true;
        new_item.number = ++num;
        new_item.clsName = item.clsName;
        new_arr.push(new_item);
        item.number = ++num;
        new_arr.push(item);
      }
      else {
        item.number = ++num;
        new_arr.push(item);
      }
    });

    /* Add at the very end if not ranked higher */
    if ( !student_ranked ) {
      new_item.number = ++num;
      new_arr.push(new_item);
    }

    $scope.cls_rnks = new_arr;
  };

  $scope.cancel = function() {
    $scope.hideform = true;
  };

  /* Verify user input */
  $scope.verify = function() {
    /* Name should have value */
    if ( $scope.stName == "" ) {
      $scope.error = true;
    }
    else { $scope.error = false; }

    /* Score should be between 0 and 100 */
    if ( parseFloat($scope.stNEABEL) < 0 || parseFloat($scope.stNEABEL) > 100 ) {
      $scope.error = true;
    }
    else { $scope.error = false; }

    /* Score should be between 0 and 100 */
    if ( parseFloat($scope.stNEAMAT) < 0 || parseFloat($scope.stNEAMAT) > 100 ) {
      $scope.error = true;
    }
    else { $scope.error = false; }

    /* Mark is between 3 and 6 */
    if ( parseInt($scope.stSubj1) < 3 || parseInt($scope.stSubj1) > 6 ) {
      $scope.error = true;
    }
    else { $scope.error = false; }

    /* Mark i between 3 and 6 */
    if ( parseInt($scope.stSubj2) < 3 || parseInt($scope.stSubj2) > 6 ) {
      $scope.error = true;
    }
    else { $scope.error = false; }

    $scope.incomplete = false;
    if ( $scope.edit             &&
        (!$scope.stName.length   ||
         !$scope.stNEABEL.length ||
         !$scope.stNEAMAT.length ||
         !$scope.stSubj1.length  ||
         !$scope.stSubj2.length
        )
       )
    {
      $scope.incomplete = true;
    }
  };

  $scope.$watch('stName'  ,function() {$scope.verify();});
  $scope.$watch('stNEABEL',function() {$scope.verify(); $scope.showRank();});
  $scope.$watch('stNEAMAT',function() {$scope.verify(); $scope.showRank();});
  $scope.$watch('stSubj1' ,function() {$scope.verify(); $scope.showRank();});
  $scope.$watch('stSubj2' ,function() {$scope.verify(); $scope.showRank();});

});
