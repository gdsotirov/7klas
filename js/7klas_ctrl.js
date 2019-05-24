/* 7klas Application Controler */

angular.module('7klas_app', []).controller('7klas_ctrl', function($scope, $http) {
  $scope.stName = '';
  $scope.stNEABEL = '';
  $scope.stNEAMAT = '';

  $scope.cls_rnks == '';
  /*$scope.cls_rnks = [
    {id:1, schlName:'Училище 1', clsName:"Клас А", min_rank_I:456, min_rank_II:432 },
    {id:2, schlName:'Училище 2', clsName:"Клас Б", min_rank_I:321, min_rank_II:123 }
  ];*/

  $http.get("get_ranks.php")
    .then(function (response) {$scope.cls_rnks = response.data;});

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
        $scope.stNEAMAT.length
        )
    {
      $scope.incomplete = false;
    }
  };

  $scope.rankStudent = function() {
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
    if ( parseInt($scope.stNEABEL) < 0 || parseInt($scope.stNEABEL) > 100 ) {
      $scope.error = true;
    }
    else { $scope.error = false; }

    /* Score should be between 0 and 100 */
    if ( parseInt($scope.stNEAMAT) < 0 || parseInt($scope.stNEAMAT) > 100 ) {
      $scope.error = true;
    }
    else { $scope.error = false; }

    $scope.incomplete = false;
    if ( $scope.edit             &&
        (!$scope.stName.length   ||
         !$scope.stNEABEL.length ||
         !$scope.stNEAMAT.length
        )
       )
    {
      $scope.incomplete = true;
    }
  };

  $scope.$watch('stName'  ,function() {$scope.verify();});
  $scope.$watch('stNEABEL',function() {$scope.verify();});
  $scope.$watch('stNEAMAT',function() {$scope.verify();});

});
