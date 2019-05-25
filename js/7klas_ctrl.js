/* 7klas Application Controler */

angular.module('7klas_app', []).controller('7klas_ctrl', function($scope, $http) {
  $scope.stName = '';
  $scope.stNEABEL = '';
  $scope.stNEAMAT = '';

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
        $scope.stNEAMAT.length
        )
    {
      $scope.incomplete = false;
    }
  };

  $scope.rankStudent = function() {
    $scope.hideform = true;
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
