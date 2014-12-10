(function () {
  angular.module('myPlanit')
    .controller('SingleTimelineCtrl', ['SinglePlanitFactory', 'SingleTimelineFactory', '$routeParams', '$scope',
      function (SinglePlanitFactory, SingleTimelineFactory, $routeParams, $scope) {

        $scope.updateMaxPlanTime = function (singlePlan, updateMaxTime) {
          // call function passing in singlePlan
          SingleTimelineFactory.updateMaxPlanTime(singlePlan, updateMaxTime);
        }

        $scope.updateAllottedTime = function (pois) {
          // call function passing in poi, the value of the input form and the whole plan object
          SingleTimelineFactory.updateAllottedTime(pois, $scope.singlePlan);
        }

        // call function that uses plan id for route and store the payload in singlePlan (current plan object)
        SinglePlanitFactory.getOnePlan($routeParams.id).success( function (data) {
          console.log(data);
          // set scope so have access to Plan object in other functions in this scope
          $scope.singlePlan = data;
          // set scope for pois contained in Plan object
          $scope.pois = data.pois;
          // call map function once the single plan object has been returned so can pass this to factory
          SingleTimelineFactory.mapPois(data.pois);

          SingleTimelineFactory.getDirections(data.pois).then(  function () {

            SingleTimelineFactory.calcTimes($scope.pois, $scope.singlePlan);
          });

          // call total allotted func

          // set scope so function can be called in html with ng-click
          $scope.getDirections = function (pois) {
            SingleTimelineFactory.getDirections(pois);
          }

        });

      }

    ]);

}());
