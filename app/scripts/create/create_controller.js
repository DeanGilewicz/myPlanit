(function () {
  angular.module('myPlanit')
    .controller('CreateCtrl', ['CreateFactory', '$scope',
      function (CreateFactory, $scope) {

        $scope.createPlan = function (plan) {
          CreateFactory.createPlan(plan);
          // $location.path('/plan');
        }

      }

    ]);

}());
