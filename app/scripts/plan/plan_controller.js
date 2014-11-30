(function () {
  angular.module('myPlanit')
    .controller('PlanCtrl', ['PlanFactory', '$scope', '$rootScope', '$location',
      function (PlanFactory, $scope, $rootScope, $location) {

        PlanFactory.getPois().success( function (results) {
          console.log(results);
          $scope.poiList = results.results;
        });

        $scope.addPoi = function (poi) {
          PlanFactory.addPoi(poi);
          // $rootScope.$on('poi:added', function () {
          //   $location.path('/plan');
          // });
        }

        $scope.deletePoi = function (poiID, index) {
          PlanFactory.deletePoi(poiID).success( function () {
            $scope.poiList.splice(index, 1);
          });
        };


      }

    ]);

}());
