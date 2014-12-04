(function () {
  angular.module('myPlanit')
    .controller('SingleTimelineCtrl', ['SinglePlanitFactory', 'SingleTimelineFactory', '$routeParams', '$scope',
      function (SinglePlanitFactory, SingleTimelineFactory, $routeParams, $scope) {


        // DO I NEED TO MAKE A CALL OR CAN I HAVE ACCESS TO THE SINGLE PLANIT FACTORY "singlePlan" scope by calling it in the dependency

        // call function that uses plan id for route and store the payload in singlePlan (current plan object)
        SinglePlanitFactory.getOnePlan($routeParams.id).success( function (data) {
          console.log(data);
          // set scope so have access to Plan object in other functions in this scope
          $scope.singlePlan = data;
          // set scope for pois contained in Plan object
          $scope.pois = data.pois;
        });

        SingleTimelineFactory.genMap();

      }

    ]);

}());
