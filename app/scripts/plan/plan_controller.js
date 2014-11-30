(function () {
  angular.module('myPlanit')
    .controller('PlanCtrl', ['PlanFactory', '$scope', '$rootScope', '$location',
      function (PlanFactory, $scope, $rootScope, $location) {

        $scope.addPoi = function (poi) {
          PlanFactory.addPoi(poi);
          // $rootScope.$on('poi:added', function () {
          //   $location.path('/');
          // });
        }

      }

    ]);

}());
