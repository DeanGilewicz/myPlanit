(function () {
  angular.module('myPlanit')
    .controller('ExistingPlanitCtrl', ['ExistingPlanitFactory', '$routeParams', '$scope',
      function (ExistingPlanitFactory, $routeParams, $scope) {

        ExistingPlanitFactory.getOnePlan($routeParams.id).success( function (data) {
          console.log(data);
          $scope.singlePlan = data;
        });

        // get http request for actual poi

      }

    ]);

}());
